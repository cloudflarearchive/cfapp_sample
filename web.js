var express = require('express');
var qs = require('querystring');
var crypto = require('crypto');
var pg = require('pg');

var app = express.createServer(express.logger());
app.enable("jsonp callback");
app.use(express.bodyParser());

var conn_string = process.env.DATABASE_URL || "tcp://michael:1234@localhost/michael";
var skip_hmac = process.env.SKIP_HMAC

function create_account(account_id, respond){
    pg.connect(conn_string, function(err, client) {
        console.log(err)
        var query = client.query('select count(*) from account where account_id = $1',[account_id]);
        query.on('error', function() {
            console.log(query)
            respond({status: "error"}, 500);
        });

        query.on('row', function(row) {
            if (row.count) {
                respond({
                    status: "exists",
                    login: {
                        url: "https://mysite.com/login",
                        expires: "2012-09-05 23:23:56 UTC"
                    }
                })
            } else {
                var query2 = client.query('insert into account(account_id) values ($1)',[account_id]);

                query2.on('end', function() {
                    respond({
                        status: "approve",
                        login: {
                            url: "https://mysite.com/login",
                            expires: "2012-09-05 23:23:56 UTC"
                        }
                    });
                });

                query2.on('error', function() {
                    console.log(query2)
                    respond({status:"error"}, 500);
                });
            }
        });
    });
}

function create_domain(body, respond){
    pg.connect(conn_string, function(err, client) {
        var query = client.query('select count(*) from domain where account_id = $1 and domain_id = $2',[body.account_id, body.domain_id]);
        query.on('error', function() {
            console.log(query)
            respond("BADNESS", 500);
        });

        query.on('row', function(row) {
            if (row.count) {
                respond("exists")
            } else {

                var query = client.query('insert into domain(account_id, domain_id) values ($1, $2)', [body.account_id,body.domain_id]);

                query.on('end', function() {
                    respond("approve");
                });

                query.on('error', function(something) {
                    respond("error: " + something.detail);
                });
            }
        });
    });
}

function log_hit(domain_id, respond){
    pg.connect(conn_string, function(err, client) {
        if (err) {
            console.log(err)
            respond("DB error", 500)
            return
        }
        var query = client.query('insert into hit(domain_id) values ($1)', [domain_id]);
        var error;

        query.on('end', function() {
            if (error) return;
            console.log(arguments)
            var query2 = client.query('select count(*) from hit where domain_id =  $1', [domain_id]);
            query2.on('row', function(row) {
                respond({count: row.count});
            });
            query2.on('error', function(something) {
                console.log(something);
                respond({error: "no count"});
            });

        });

        query.on('error', function(something) {
            error = true;
            console.log(domain_id);
            console.log(something);
            respond({error: "no inc"});
        });
    });

}

function valid(req) {
    // console.log(req.body)
    if (skip_hmac) return true;
    var hmac_secret = '09aed14f2a579b0f50965418c67b600d';
    var hmac = crypto.createHmac("sha256", hmac_secret);
    var contents = JSON.stringify(req.body);
    hmac.update(contents);
    return req.headers.hmac == hmac.digest('hex');
}
app.post('/api/accounts', function(request, response) {
    if (!valid(request)) {
        response.send("Bad HMAC");
    } else {
        var respond = function(vals, code){
            response.status(code || 200);
            vals.account_id = request.body.account_id
            response.send(JSON.stringify(vals));
        }
        if (!request.body.account_id) {
            respond({error: "no account_id"}, 400)
        } else {
            create_account(request.body.account_id, respond);
        }
    };
});

app.post('/api/domains', function(request, response) {
    if (!valid(request)) {
        response.send("Bad HMAC");
        response.status(433);
    } else {
        var respond = function(status, code){
            response.status(code || 200);
            if (status == 'error') {
                response.send("error");
            } else {
                response.send(JSON.stringify({
                    "account_id":request.body.account_id,
                    "domain_id":request.body.domain_id,
                    "status":status
                }));
            }
        }
        create_domain(request.body, respond);
    };
});

app.get('/hit', function(request, response) {
    var respond = function(obj){
        response.json(JSON.stringify(obj));
    }
    if (!request.query.domain_id) {
        respond({error: "no domain_id"})
    } else {
        log_hit(request.query.domain_id, respond);
    }
});


var port = process.env.PORT
app.listen(port, function() {
    console.log("Listening on " + port);
});
