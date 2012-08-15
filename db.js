#! /usr/bin/env node
var pg = require('pg');

function create_db(){
    pg.connect(process.env.DATABASE_URL || "tcp://michael:1234@localhost/michael", function(err, client) {
        client.query("CREATE TABLE account(account_id BIGINT PRIMARY KEY, cdate TIMESTAMPTZ default now());");
        client.query("CREATE TABLE domain(domain_id BIGINT PRIMARY KEY, account_id BIGINT REFERENCES account(account_id), cdate TIMESTAMPTZ default now());");
        client.query("CREATE TABLE hit(hit_id serial PRIMARY KEY, domain_id BIGINT REFERENCES domain(domain_id), cdate TIMESTAMPTZ default now());");
    })
}

create_db();
