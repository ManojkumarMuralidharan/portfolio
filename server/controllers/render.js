import { renderToString } from 'react-dom/server';
import React from 'react';
import {
  ServerStyleSheets,
  ThemeProvider,
} from '@material-ui/styles';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import _ from 'lodash';
import App from '../../public/js/templates/app';
import combinedReducers from '../../public/js/redux/reducers';

import { fetchGraphQlData } from '../services/gitApi';
import { fetchMediumArticles } from '../services/medium';
import { isResumeEnabled } from '../services/handleFeedback';
import muiTheme from '../cssTheme/theme';
import renderFullPageTemplate from '../template/homepage';

const handleRender = (req, res) => {
  // Create a sheetsRegistry instance.
  const sheets = new ServerStyleSheets();
  const storeInitialState = {
    fieldState: {
      captcha: {
        verified: false,
      },
      contactForm: {
        display: false,
      },
      drawer: {
        state: false,
      },
      loadBar: {
        open: false,
        text: '',
        autoHideDuration: 2000,
      },
    },
    appState: {},
  };
  // Create a new Redux store instance
  async function prefetchDataforSSR() {
    const githubData = await fetchGraphQlData();
    const modifiedDataGithub = Array.prototype.map.call(
      githubData.data.search.edges,
      (item) => {
        const { name, description, url } = item.node;
        return {
          name,
          description,
          url,
        };
      },
    );
    storeInitialState.fieldState.github = modifiedDataGithub;
    const mediumArticleData = await fetchMediumArticles();
    const modifiedDataMedium = _.map(
      _.get(mediumArticleData, ['payload', 'references', 'Post']),
      (item) => {
        const { title, content, uniqueSlug } = item;
        return {
          name: title,
          title,
          description: content.subtitle,
          url: `https://medium.com/@manoj.wolfpack/${uniqueSlug}`,
        };
      },
    );
    storeInitialState.fieldState.medium = modifiedDataMedium;
    const resumeDisplayed = await isResumeEnabled();
    const store = createStore(combinedReducers, storeInitialState);

    // Render the component to a string.
    const html = renderToString(
      sheets.collect(
        <Provider store={store}>
          <ThemeProvider theme={muiTheme}>
            <StaticRouter location={req.url} context={{}}>
              <App />
            </StaticRouter>
          </ThemeProvider>
        </Provider>,
      ),
    );

    // // Grab the CSS from our sheetsRegistry.
    const css = sheets.toString();
    // Grab the initial state from our Redux store
    const preloadedState = store.getState();

    // Send the rendered page back to the client.
    res.send(renderFullPageTemplate(html, css, preloadedState));
  }

  prefetchDataforSSR();
};

export default handleRender;
