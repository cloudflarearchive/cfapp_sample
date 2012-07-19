var express = require('express');
var qs = require('querystring');
var crypto = require('crypto');
var pg = require('pg');

var app = express.createServer(express.logger());
app.use(express.bodyParser());

function create_account(account_id, respond){
    pg.connect(process.env.DATABASE_URL || "tcp://michael:1234@localhost/michael", function(err, client) {
        console.log(err)
        var query = client.query('insert into accounts(account_id) values ('+account_id+')');

        query.on('end', function() {
            respond("approve");
        });

        query.on('error', function() {
            respond("approve");
        });
    });
}

function valid(data) {
    var hmac_secret = '09aed14f2a579b0f50965418c67b600d';
    var hmac = crypto.createHmac("sha256", hmac_secret);
    hmac.update(data.account_id);
    return data.sig == hmac.digest('hex');
}
app.post('/api/accounts', function(request, response) {
    if (!valid(request.body)) {
        response.send("Bad HMAC");
    } else {
        var respond = function(status){
            response.send('{"account_id":"'+request.body.account_id+'","status":"'+status+'"}');
        }
        create_account(request.body.account_id, respond);
    };
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});
