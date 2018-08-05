'use strict';
import path from 'path';
import express from 'express';
// import fs from 'fs';
import React from 'react';
/*import App from './App';*/
import {handleRender} from './server/controllers/render';
import {handleGitApi} from './server/services/gitApi.js';
import {handleMedium} from './server/services/medium.js';
import {fetchLocations,sendFeedback, fetchBio} from './server/services/handleFeedback.js';
import * as bodyParser from 'body-parser';
const app = express();

// const http = require('http');
// const https = require('https');
// const privateKey  = fs.readFileSync('/usr/local/etc/nginx/server_local.key', 'utf8');
// const certificate = fs.readFileSync('/usr/local/etc/nginx/server_local.crt', 'utf8');
// const credentials = {key: privateKey, cert: certificate};

var options = {
  etag: true,
  index: false,
  maxAge: '1d',
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now()),
    res.setHeader("Cache-Control", "public, max-age=612000");
    res.setHeader("Expires", new Date(Date.now() + 612000000).toUTCString());
  }
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('serviceWorkers', options));
app.use(express.static('dist', options));
app.use(express.static('public', options));
app.use(express.static('docs', options));
app.use(express.static('fonts', options));
app.use(express.static('manifest', options));

//app.use('serviceWorker.js', express.serve('serviceWorkers/serviceWorker.js'))
// This is fired every time the server side receives a request.
app.use('/git', handleGitApi);
app.use('/medium', handleMedium);
app.use('/locations', fetchLocations);
app.post('/sendFeedback', sendFeedback);
app.use('/fetchBio',fetchBio);

app.use(handleRender);
const port = process.env.appPort;
app.listen(port);
// const httpsServer = https.createServer(credentials, app);
// httpsServer.listen(8443);

