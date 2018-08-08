import { renderToString } from 'react-dom/server'
import { SheetsRegistry, JssProvider } from 'react-jss';
//import getMuiTheme from 'material-ui/styles/getMuiTheme';
//import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import React from 'react';
import {createMuiTheme}  from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createGenerateClassName from '@material-ui/core/styles/createGenerateClassName';
// import {green100, green500, green700} from 'material-ui/colors';
import App from '../../public/js/templates/app';
import { white, red } from '@material-ui/core/colors';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import combinedReducers from '../../public/js/redux/reducers/index.js';
import { StaticRouter, matchPath } from "react-router-dom";

import {fetchGraphQlData } from '../services/gitApi';
import {fetchMediumArticles} from '../services/medium';
import {isResumeEnabled} from '../services/handleFeedback';

import _ from 'lodash';

export function handleRender(req, res) {
 //  // Create a sheetsRegistry instance.
  const sheetsRegistry = new SheetsRegistry();
  let storeInitialState = {
    fieldState: {
      contactForm:{
        display:false
      },
      drawer:{
        state : false
      },
      loadBar:{
        open : false,
        text: '',
        autoHideDuration:2000
      }
    },
    appState: {}
  } ;
  // Create a new Redux store instance
  async function prefetchDataforSSR(){
      let githubData = await fetchGraphQlData();
      const modifiedDataGithub = Array.prototype.map.call(githubData.data.search.edges,function(item){
          const {name,description, url} = item.node;
          return {
            name,
            description,
            url
          };
      });
      storeInitialState['fieldState']['github'] = modifiedDataGithub;
      let mediumArticleData = await fetchMediumArticles();
      const modifiedDataMedium = _.map(_.get(mediumArticleData,['payload','references','Post']),function(item){
          const {title, content, uniqueSlug} = item;
          return {
            name : title,
            title : title,
            description : content.subtitle,
            url : `https://medium.com/@manoj.wolfpack/${uniqueSlug}`
          };
      });
      storeInitialState['fieldState']['medium'] = modifiedDataMedium;
      let resumeDisplayed = await isResumeEnabled();
      const store = createStore(combinedReducers, storeInitialState);

      //
      // Create a theme instance.
      const muiTheme = createMuiTheme({
        palette: {
          primary: white,
          secondary: white,
          accent: white,
          type: 'light',
        },
      });
      //  // Create a theme instance.
      //  const theme =  createMuiTheme({
     	//   palette: {
     	//     primary1Color: green500,
     	//     primary2Color: green700,
     	//     primary3Color: green100,
     	//   },
     	// }, {
     	//   avatar: {
     	//     borderColor: null,
     	//   },
     	//   userAgent: req.headers['user-agent'],
      //  });
      //
       const generateClassName = createGenerateClassName();

       // Render the component to a string.
       const html = renderToString(
         <Provider store={store}>
         <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
         <MuiThemeProvider theme={muiTheme}>
          <StaticRouter location={req.url} context={{}}>
            <App />
          </StaticRouter>
        </MuiThemeProvider>
        </JssProvider>
        </Provider>
       );


       // // Grab the CSS from our sheetsRegistry.
       const css = sheetsRegistry.toString()
       // Grab the initial state from our Redux store
       const preloadedState = store.getState();

       // console.log('css',css);

       // Send the rendered page back to the client.
       res.send(renderFullPage(html, css, preloadedState));

  }

 prefetchDataforSSR();

}

function renderFullPage(html, css, preloadedState) {
  return `
    <!doctype html>
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="manifest/icons/favicon_2.png" type="image/x-icon">
        <link rel="apple-touch-icon" href="/images/avatar.png">
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-38147306-2"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'UA-38147306-2');
        </script>
        <script>
         // WARNING: See the following for security issues around embedding JSON in HTML:
         // http://redux.js.org/recipes/ServerRendering.html#security-considerations
         window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
       </script>
        <title>Manoj-IO</title>
        <meta name="theme-color" content="#302b2a" />
        <meta name="Description" content="Portfolio of Manojkumar Muralidharan">
        <meta name="apple-mobile-web-app-title" content="Manoj I/O">
        <meta name="viewport" content="width=device-width, initial-scale=0.5">
        <link rel="manifest" href="/manifest/manifest.json">
      </head>
      <body>
        <p class="copy" ></p>
        <div id="root">${html}</div>
        <style id="jss-server-side">${css}</style>
        <script src="main.js"></script>
        <style>
        body{
          margin : -16px;
          min-height: 100%;
        }
        copy{
          visibility: hidden;
        }
        html { height: 100%; }
        <!-- TODO: load fonts optimally and using webpack 4 -->
        <!--font-family: 'Poiret One', cursive; -->
        <!--font-family: 'Roboto', sans-serif; -->
        @font-face {
            font-family: "palanquin";
            src: url(/fonts/palanquin/palanquin-ExtraLight-git.ttf) format("truetype");
        }
        @font-face {
            font-family: "muli";
            src: url(/fonts/muli/Muli-ExtraLight.ttf) format("truetype");
        }
        @font-face {
            font-family: "oneday";
            src: url(/fonts/oneday/oneday.ttf) format("truetype");
        }
        @font-face {
            font-family: "roboto-thin";
            src: url(/fonts/roboto/Roboto-Thin.ttf) format("truetype");
        }
        </style>
        <link href="https://fonts.googleapis.com/css?family=Poiret+One|Roboto:100|Ubuntu:500|Roboto+Condensed:300|Montserrat|Exo:900"" rel="stylesheet">
      </body>
    </html>
  `;
}
