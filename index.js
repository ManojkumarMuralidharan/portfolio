'use strict';
import path from 'path';
import express from 'express'
import React from 'react';
/*import App from './App';*/
import {handleRender} from './server/controllers/render';
import {handleGitApi} from './server/services/gitApi.js';
import {handleMedium} from './server/services/medium.js';

console.log(handleRender);

const app = express();
app.use(express.static('dist'));
app.use(express.static('public'));
app.use(express.static('docs'));
// This is fired every time the server side receives a request.
app.use('/git', handleGitApi);
app.use('/medium', handleMedium);
app.use(handleRender);
const port = process.env.appPort;
app.listen(port);
