import React from 'react';
import { hydrate } from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { white, red } from '@material-ui/core/colors';
import App from './app';
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import { graphql } from 'react-apollo'
// const client = new ApolloClient({
//   uri: "https://api.github.com/graphql"
// });


import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      authorization: 'Bearer d299b8218ac85783e61610155ca567e2f6433944'
    }
  }
});
console.log('authLink.concat(httpLink)',authLink.concat(httpLink));
const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  request: (operation) => {
    operation.setContext({
      headers: {
        authorization: 'Bearer d299b8218ac85783e61610155ca567e2f6433944'
      }
    });
  }
});




export default class Main extends React.Component {
  // Remove the server-side injected CSS.
  componentDidMount() {
    // const jssStyles = document.getElementById('jss-server-side');
    // if (jssStyles && jssStyles.parentNode) {
    //   jssStyles.parentNode.removeChild(jssStyles);
    // }

  }

  render() {
    return <App {...this.props} />
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
