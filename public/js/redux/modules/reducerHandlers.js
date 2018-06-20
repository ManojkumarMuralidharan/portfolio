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

export const fetchGitRepositories = (dispatch) => {
  return fetch('/git')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    return dispatch({
           type: types.UPDATE_FIELD,
           value: {github : data}
    });
  }).catch(error => { throw error; })
}


export const fetchMediumArticles = (dispatch) => {
  return fetch('/medium')
    .then(r => r.json())
    .then(data => dispatch({
             type: types.UPDATE_FIELD,
             value: {medium : _.get(data,['payload','references','Post'])}
    }))
    .catch(error =>  { throw error; })
}
