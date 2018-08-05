import React from 'react';
import { hydrate } from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { white, red } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import App from './app';
import initStore from '../redux/store/store.js';
import combinedReducers from '../redux/reducers/index.js';
import { Provider } from "react-redux";
import _ from 'lodash';
import Spinner from 'react-spinkit';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import * as types from '../constants/actionTypes';
import { BrowserRouter as Router, Route } from "react-router-dom";
//import * as serviceWorker from '../serviceWorkers/serviceWorker';

export default class Main extends React.Component {

  constructor(props){
    super(props);
    this.windowLoaded = this.windowLoaded.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  windowLoaded(){
    const that = this;
    if('serviceWorker' in navigator) {
      navigator.serviceWorker
               .register('/serviceWorker.js')
               .then(function() { console.log("Service Worker Registered"); });
    }

    setTimeout(function(){
      window.performance = window.performance || window.mozPerformance || window.msPerformance || window.webkitPerformance || {};
      var t = performance.timing || {};

      if (!t) {

        return;
      }
      const start = t.navigationStart;
      const end = t.loadEventEnd;
      const loadTime = (end - start) / 1000;

      const dispatchObject = {
        open : true,
        loadTime : loadTime,
        text: `This Page loaded in ${loadTime} seconds`
      };
      that.state.appStore.dispatch({
               type: types.UPDATE_FIELD,
               value: {loadBar : dispatchObject}
      });
      that.state.appStore.dispatch({
        type: types.UPDATE_APP_STATE,
        value:  {width: window.innerWidth, height: window.innerHeight}
      });


    }, 0);

  }
  // Remove the server-side injected CSS.
  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
    window.addEventListener('load', this.windowLoaded);
    window.addEventListener('resize', this.updateWindowDimensions);
    this.setState({
        appStore: initStore(combinedReducers, { fieldState: {contactForm:{display:false}}, appState: {} })
    });
  }

  updateWindowDimensions() {
    this.state.appStore.dispatch({
      type: types.UPDATE_APP_STATE,
      value:  {width: window.innerWidth, height: window.innerHeight}
    });
  }


  componentWillUnmount() {
   window.removeEventListener('resize', this.updateWindowDimensions);
   window.removeEventListener('load', this.windowLoaded);
  }

  render() {
    return _.get(this.state,'appStore',false) ? (
      <Provider store={this.state.appStore} firebase={this.state.firebase}>
        <App {...this.props} />
      </Provider>
    ) : (
    <div >
      <Spinner name="pacman" style={{position: 'absolute', top: '50%', left: '50%'}}/>
      <Typography style={{position: 'absolute', top: '60%', left: '50%'}}>
        Loading
      </Typography>
    </div>);
  }
}

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

// document.addEventListener("DOMContentLoaded", function(event) {
//     console.log("DOM fully loaded and parsed");
    hydrate(
      <MuiThemeProvider theme={muiTheme}>
       <Router>
          <Main />
       </Router>
     </MuiThemeProvider>,
      document.querySelector('#root'),
    );
  // });
