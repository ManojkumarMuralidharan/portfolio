import express from 'express';
import * as bodyParser from 'body-parser';
import handleRender from './server/controllers/render';
import { handleGitApi } from './server/services/gitApi';
import { handleMedium } from './server/services/medium';
import verifyCaptcha from './server/services/captcha';
import {
  fetchLocations, fetchBio, handleResumeEnabled, sendFeedback,
} from './server/services/handleFeedback';
import cache from './server/cache';

const app = express();

const options = {
  etag: true,
  index: false,
  maxAge: '1d',
  setHeaders: (res) => {
    res.set('x-timestamp', Date.now());
    res.setHeader('Cache-Control', 'public, max-age=612000');
    res.setHeader('Expires', new Date(Date.now() + 612000).toUTCString());
  },
};
const memCacheDuration = process.env.memCacheDuration || 10;
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
app.use('/fetchBio', fetchBio);
app.use('/resume', handleResumeEnabled);
app.use('/verifyCaptcha', verifyCaptcha);
app.get('/', cache(memCacheDuration), handleRender);
app.get('*', handleRender);
const port = process.env.appPort;
app.listen(port);
