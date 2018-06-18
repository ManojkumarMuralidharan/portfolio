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

export function handleRender(req, res) {
 //  // Create a sheetsRegistry instance.
  const sheetsRegistry = new SheetsRegistry();
  console.log('sheets',sheetsRegistry);
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
  // const html = renderToString(
  //   <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
  //   <MuiThemeProvider theme={muiTheme}>
  //    <App />
  //  </MuiThemeProvider>
  //  </JssProvider>
  // );
  const html ='<div></div>';


  // // Grab the CSS from our sheetsRegistry.
  const css = sheetsRegistry.toString()
  // console.log('css',css);

  // Send the rendered page back to the client.
  res.send(renderFullPage(html, css))
}

function renderFullPage(html, css) {
  return `
    <!doctype html>
    <html>
      <head>
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-38147306-2"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'UA-38147306-2');
        </script>
        <title>Material-UI</title>
        <style>
        body{
          margin : 0;
          min-height: 100%;
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
        <link href="https://fonts.googleapis.com/css?family=Poiret+One|Roboto:100|Ubuntu:500|Roboto+Condensed:300|Montserrat" rel="stylesheet">
      </head>
      <body>
        <div id="root">${html}</div>
        <style id="jss-server-side">${css}</style>
        <script src="main.js"></script>
      </body>
    </html>
  `;
}
