'use strict';
import path from 'path';
import express from 'express'
import React from 'react';
/*import App from './App';*/
import {handleRender} from './server/controllers/render';

console.log(handleRender);

const app = express();
app.use(express.static('dist'));
// This is fired every time the server side receives a request.
app.use(handleRender);

const port = 3000;
app.listen(port);
