'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const http = require('http');

const fs = require('fs');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';
const PORT_SSL = 8443;

// App
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw());
app.use(bodyParser.text())

let recibidos = [];


app.post('/report', (req, res) => {
    const body = req.body
    console.log(body);
    recibidos.push(body)
    res.send('Ok');
  });

  app.get('/records', (req, res) => {
    res.send(recibidos);
  });

app.get('/', (req, res) => {
  res.send('Hello World');
});

//app.listen(PORT, HOST);
//console.log(`Running on http://${HOST}:${PORT}`);

// Listen both http & https ports
const httpServer = http.createServer(app);


httpServer.listen(PORT, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});

var key = fs.readFileSync(__dirname + '/certs/selfsigned.key');
var cert = fs.readFileSync(__dirname + '/certs/selfsigned.crt');
var options = {
  key: key,
  cert: cert
};
var httpsServer = https.createServer(options, app);

httpsServer.listen(PORT_SSL, () => {
  console.log("server starting on port : " + PORT_SSL)
});
