#!/usr/bin/env node
var amqp = require('amqplib/callback_api');
var fs = require("fs");

function sendMessage(message){
    amqp.connect('amqp://localhost', function(err, conn) {
        conn.createChannel(function(err, ch) {
            var q = 'hello';
            ch.assertQueue(q, {durable: false});
            ch.sendToQueue(q, new Buffer(message));
            console.log("Sent "+ message);
        });
    });
}


var express = require('express');
var app = express();

app.get('/:msg?', function (req, res) {
    console.log('ok ' + req.params.msg.toString());
    sendMessage(req.params.msg.toString());
    res.writeHead(200, {
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Access-Control-Allow-Headers': 'origin, content-type, accept, authorization,Cache-Control, pragma, Content-Type, X-Requested-With',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET, POST, DELETE'
    });

});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

