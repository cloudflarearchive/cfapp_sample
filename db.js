#! /usr/bin/env node
var pg = require('pg');

function create_db(){
    pg.connect(process.env.DATABASE_URL || "tcp://michael:1234@localhost/michael", function(err, client) {
        client.query("CREATE TABLE accounts(account_id BIGINT PRIMARY KEY, status VARCHAR(8), cdate TIMESTAMPTZ default now());");
    })
}

create_db();
