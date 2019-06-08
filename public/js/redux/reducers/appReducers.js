import { merge } from 'lodash';
import * as types from '../../constants/actionTypes';

const appReducer = (state = {}, action) => {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case types.UPDATE_APP_STATE:
      return merge(newState, action.value);
    default:
      return state;
  }
};


export default appReducer;
