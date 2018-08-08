'use strict';
import express from 'express';
import {handleRender} from './server/controllers/render';
import {handleGitApi} from './server/services/gitApi.js';
import {handleMedium} from './server/services/medium.js';
import {fetchLocations,sendFeedback, fetchBio, handleResumeEnabled} from './server/services/handleFeedback.js';
import * as bodyParser from 'body-parser';

const app = express();

var options = {
  etag: true,
  index: false,
  maxAge: '1d',
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now()),
    res.setHeader("Cache-Control", "public, max-age=612000");
    res.setHeader("Expires", new Date(Date.now() + 612000).toUTCString());
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

app.use('/git', handleGitApi);
app.use('/medium', handleMedium);
app.use('/locations', fetchLocations);
app.post('/sendFeedback', sendFeedback);
app.use('/fetchBio',fetchBio);
app.use('/resume', handleResumeEnabled);
app.use(handleRender);
const port = process.env.appPort;
app.listen(port);

