import { renderToString } from 'react-dom/server'
import { SheetsRegistry, JssProvider } from 'react-jss';
//import JssProvider from 'react-jss/lib/JssProvider';
//import getMuiTheme from 'material-ui/styles/getMuiTheme';
//import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import React from 'react';
// import {createMuiTheme}  from 'material-ui/styles';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import createGenerateClassName from 'material-ui/styles/createGenerateClassName';
// import {green100, green500, green700} from 'material-ui/colors';
import App from '../../public/js/templates/app';

export function handleRender(req, res) {
 //  // Create a sheetsRegistry instance.
 //  const sheetsRegistry = new SheetsRegistry();
 //  console.log('sheets',sheetsRegistry);
 //
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
 // const generateClassName = createGenerateClassName();

  // Render the component to a string.
  const html = renderToString(
	  <App />
  );


  // // Grab the CSS from our sheetsRegistry.
  // const css = sheetsRegistry.toString()
  // console.log('css',css);

  // Send the rendered page back to the client.
  res.send(renderFullPage(html))
}

function renderFullPage(html, css) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Material-UI</title>
        <style>
        body{
          margin : 0;
        }
        <!-- TODO: load fonts optimally and using webpack 4 -->
        @font-face {
            font-family: "palanquin";
            src: url(/fonts/palanquin/palanquin-thin.ttf) format("truetype");
        }
        @font-face {
            font-family: "muli";
            src: url(/fonts/muli/Muli-ExtraLight.ttf) format("truetype");
        }
        @font-face {
            font-family: "oneday";
            src: url(/fonts/oneday/oneday.ttf) format("truetype");
        }
        </style>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">
      </head>
      <body>
        <div id="root">${html}</div>
        <style id="jss-server-side">${css}</style>
        <script src="main.js"></script>
      </body>
    </html>
  `;
}
