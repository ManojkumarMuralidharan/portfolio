import {
  merge,
} from 'lodash';
import * as types from '../../constants/actionTypes';
import {
  writeUserFeeback,
} from '../modules/reducerHandlers';

const fieldsReducer = (state = {}, action) => {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case types.FETCH_TODOS:
      return action.payload;
    case types.UPDATE_FIELD:
      return merge(newState, action.value);
    case types.TOGGLE_CONTACT_FORM:
      newState.contactForm.display = action.value;
      return newState;
    case types.WRITE_USER_FEEDBACK:
      writeUserFeeback(action.value);
      return state;
    case types.OPEN_SIDE_DRAWER:
      newState.drawer.state = action.value;
      return newState;
    default:
      return state;
  }
};

export default fieldsReducer;
