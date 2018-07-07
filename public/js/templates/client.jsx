import React from 'react';
import { hydrate } from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { white, red } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import App from './app';
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import { graphql } from 'react-apollo'
import initStore from '../redux/store/store.js';
import combinedReducers from '../redux/reducers/index.js';
import { Provider } from "react-redux";
import _ from 'lodash';
import Spinner from 'react-spinkit';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
// const client = new ApolloClient({
//   uri: "https://api.github.com/graphql"
// });

import * as types from '../constants/actionTypes';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
//
// const httpLink = createHttpLink({
//   uri: 'https://api.github.com/graphql',
// });
//
//
// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = localStorage.getItem('token');
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       authorization: 'Bearer 48c9fcedf75eaad04b6837a7792d2097e453413a'
//     }
//   }
// });

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  request: (operation) => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${process.env.gitApiKey}`
      }
    });
  }
});




export default class Main extends React.Component {

  constructor(props){
    super(props);
    this.windowLoaded = this.windowLoaded.bind(this);
  }

  windowLoaded(){
    const that = this;
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
        loadTime : loadTime
      };
      that.state.appStore.dispatch({
               type: types.UPDATE_FIELD,
               value: {loadBar : dispatchObject}
      });
      setTimeout(function(){
        that.state.appStore.dispatch({
                 type: types.UPDATE_FIELD,
                 value: {
                   loadBar : {
                     open : false,
                     loadTime : loadTime
                   }
                 }
        });
      },1000);

    }, 0);

  }
  // Remove the server-side injected CSS.
  componentDidMount() {
    // const jssStyles = document.getElementById('jss-server-side');
    // if (jssStyles && jssStyles.parentNode) {
    //   jssStyles.parentNode.removeChild(jssStyles);
    // }
    window.addEventListener('load', this.windowLoaded);
    this.setState({
        appStore: initStore(combinedReducers, { fieldState: {contactForm:{display:false}}, appState: {} })
    });
  }



  componentWillMount(){

  }

  render() {
    return _.get(this.state,'appStore',false) ? (<Provider store={this.state.appStore} firebase={this.state.firebase}>
      <App {...this.props} />
    </Provider>) : (<div >
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

hydrate(
  <ApolloProvider client={client}>
  <MuiThemeProvider theme={muiTheme}>
   <Main />
 </MuiThemeProvider>
 </ApolloProvider>,
  document.querySelector('#root'),
);
