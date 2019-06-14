
const renderFullPageTemplate = (html, css, preloadedState) => `
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
     window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
    /</g,
    '\\u003c',
  )}
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
    <script src="main.js"></script>
    <link href="https://fonts.googleapis.com/css?family=Poiret+One|Roboto:100|Ubuntu:500|Roboto+Condensed:300|Montserrat|Exo:900"" rel="stylesheet">
    <script src="https://www.google.com/recaptcha/api.js?render=6Lcpm6cUAAAAAP9Un8nwFkkXshD32onWGlNguaiy"></script>
    <script>
    grecaptcha.ready(function() {
       console.log('Captcha loaded and ready');
    });
    </script>
  </body>
</html>
`;
export default renderFullPageTemplate;
