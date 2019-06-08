import _ from 'lodash';
import * as types from '../../constants/actionTypes';

export const fetchLocations = dispatch => fetch('/locations')
  .then(response => response.json())
  .then(data => dispatch({
    type: types.UPDATE_FIELD,
    value: { locations: data.locations },
  })).catch((error) => { throw error; });

export const isResumeEnabled = dispatch => fetch('/resume')
  .then(response => response.json())
  .then(data => dispatch({
    type: types.UPDATE_FIELD,
    value: { resume: data },
  })).catch((error) => { throw error; });


export const fetchBio = dispatch => fetch('/fetchBio')
  .then(response => response.json())
  .then(data => dispatch({
    type: types.UPDATE_FIELD,
    value: data,
  })).catch((error) => { throw error; });

export const verifyCaptcha = (dispatch, tokenValue) => {
  const data = { token: tokenValue };

  return fetch('/verifyCaptcha', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    body: JSON.stringify(data),
  }).then(response => response.json())
    .then((response) => {
      if (response.success) {
        console.log('Captcha verified');
      } else {
        console.log('Captcha Not verified');
      }
      dispatch({
        type: types.UPDATE_FIELD,
        value: { captcha: { verified: true } },
      });
    }).catch((error) => { throw error; });
};

export const writeUserFeeback = (payload) => {
  const {
    firstName, lastName, email, phone, subject, message,
  } = payload;

  const data = {
    firstName,
    email,
    phone,
    lastName,
    subject,
    message,
  };
  return fetch('/sendFeedback', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
};


export const fetchGitRepositories = dispatch => fetch('/git')
  .then(response => response.json())
  .then((data) => {
    const modifiedData = Array.prototype.map.call(data.data.search.edges, (item) => {
      const { name, description, url } = item.node;
      return {
        name,
        description,
        url,
      };
    });
    return dispatch({
      type: types.UPDATE_FIELD,
      value: { github: modifiedData },
    });
  }).catch((error) => { throw error; });


export const fetchMediumArticles = dispatch => fetch('/medium')
  .then(r => r.json())
  .then((data) => {
    const modifiedData = _.map(_.get(data, ['payload', 'references', 'Post']), (item) => {
      const { title, content, uniqueSlug } = item;
      return {
        name: title,
        title,
        description: content.subtitle,
        url: `https://medium.com/@manoj.wolfpack/${uniqueSlug}`,
      };
    });
    dispatch({
      type: types.UPDATE_FIELD,
      value: { medium: modifiedData },
    });
  })
  .catch((error) => { throw error; });

export const toggleContactForm = (dispatch, dialogState) => dispatch({
  type: types.TOGGLE_CONTACT_FORM,
  value: dialogState,
});

export const toggleDrawerState = (dispatch, drawerState) => dispatch({
  type: types.OPEN_SIDE_DRAWER,
  value: drawerState,
});
