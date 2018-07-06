// import { todosRef } from "../config/firebase";
// import { FETCH_TODOS } from "./types";
//
// export const addToDo = newToDo => async dispatch => {
//   todosRef.push().set(newToDo);
// };
//
// export const completeToDo = completeToDoId => async dispatch => {
//   todosRef.child(completeToDoId).remove();
// };
//
// export const fetchToDos = () => async dispatch => {
//   todosRef.on("value", snapshot => {
//     dispatch({
//       type: FETCH_TODOS,
//       payload: snapshot.val()
//     });
//   });
// };

import firebase from '../../../../config/firebase';
import * as types from '../../constants/actionTypes';
import _ from 'lodash';

export const fetchLocations = (dispatch) => {
  return firebase.database().ref('/locations').once('value').then(function(snapshot) {
    return dispatch({
           type: types.UPDATE_FIELD,
           value: {locations : _.values(snapshot.val())}
    });
  }).catch(error => { throw error; })
}

export const  writeUserFeeback = (firstName, lastName, email, phone, subject, message)  => {
  var newChildRef = firebase.database().ref('feedback').push();
  newChildRef.set({
    firstName: firstName,
    email: email,
    phone : phone,
    lastName: lastName,
    subject: subject,
    message: message
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
