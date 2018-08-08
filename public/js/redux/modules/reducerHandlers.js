import * as types from '../../constants/actionTypes';
import _ from 'lodash';

export const fetchLocations = (dispatch) => {
  return fetch('/locations')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    return dispatch({
           type: types.UPDATE_FIELD,
           value: {locations : data.locations}
    });
  }).catch(error => { throw error; });
}

export const isResumeEnabled = (dispatch) => {
  return fetch('/resume')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    return dispatch({
           type: types.UPDATE_FIELD,
           value: {resume : data}
    });
  }).catch(error => { throw error; });
}


export const fetchBio = (dispatch) => {
  return fetch('/fetchBio')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    return dispatch({
           type: types.UPDATE_FIELD,
           value: data
    });
  }).catch(error => { throw error; });
}

export const  writeUserFeeback = (firstName, lastName, email, phone, subject, message)  => {
  const data = {
    firstName: firstName,
    email: email,
    phone : phone,
    lastName: lastName,
    subject: subject,
    message: message
  }
  return fetch('/sendFeedback', {
        method: "POST",
        mode: "cors",
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
}


export const fetchGitRepositories = (dispatch) => {
  return fetch('/git')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    const modifiedData = Array.prototype.map.call(data.data.search.edges,function(item){
        const {name,description, url} = item.node;
        return {
          name,
          description,
          url
        };
    });
    return dispatch({
           type: types.UPDATE_FIELD,
           value: {github : modifiedData}
    });
  }).catch(error => { throw error; })
}


export const fetchMediumArticles = (dispatch) => {
  return fetch('/medium')
    .then(r => r.json())
    .then(data => {
      const modifiedData = _.map(_.get(data,['payload','references','Post']),function(item){
          const {title, content, uniqueSlug} = item;
          return {
            name : title,
            title : title,
            description : content.subtitle,
            url : `https://medium.com/@manoj.wolfpack/${uniqueSlug}`
          };
      });
      dispatch({
             type: types.UPDATE_FIELD,
             value: {medium : modifiedData}
      })
    }
    )
    .catch(error =>  { throw error; })
}

export const toggleContactForm = (dispatch, dialogState) => {
  return dispatch({
         type: types.TOGGLE_CONTACT_FORM,
         value: dialogState
  });
}

export const toggleDrawerState = (dispatch, drawerState) => {
  return dispatch({
         type: types.OPEN_SIDE_DRAWER,
         value: drawerState
  });
}
