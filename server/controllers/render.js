import { renderToString } from 'react-dom/server'
import { SheetsRegistry, JssProvider } from 'react-jss';
//import JssProvider from 'react-jss/lib/JssProvider';
//import getMuiTheme from 'material-ui/styles/getMuiTheme';
//import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import React from 'react';
import {createMuiTheme}  from 'material-ui/styles';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createGenerateClassName from 'material-ui/styles/createGenerateClassName';
import {green100, green500, green700} from 'material-ui/colors';
import App from '../../public/js/templates/app';

export function handleRender(req, res) {
  // Create a sheetsRegistry instance.
  const sheetsRegistry = new SheetsRegistry();
  console.log('sheets',sheetsRegistry);

  // Create a theme instance.
  const theme =  createMuiTheme({
	  palette: {
	    primary1Color: green500,
	    primary2Color: green700,
	    primary3Color: green100,
	  },
	}, {
	  avatar: {
	    borderColor: null,
	  },
	  userAgent: req.headers['user-agent'],
  });
 
 const generateClassName = createGenerateClassName();

  // Render the component to a string.
  const html = renderToString(
	  <JssProvider registry={sheetsRegistry} generateClassName={generateClassName} >
      <MuiThemeProvider muiTheme={theme} sheetsManager={new Map()}>
       <button>I can access {theme.primary1Color}</button>
        <App />
      </MuiThemeProvider>
      </JssProvider>
  );


  // Grab the CSS from our sheetsRegistry.
  const css = sheetsRegistry.toString()
  console.log('css',css);

  // Send the rendered page back to the client.
  res.send(renderFullPage(html, css))
}

function renderFullPage(html, css) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Material-UI</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <style id="jss-server-side">${css}</style>
        <script src="main.js"></script>
      </body>
    </html>
  `;
}
