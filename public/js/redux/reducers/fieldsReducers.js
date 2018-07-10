import * as types from '../../constants/actionTypes';
import { writeUserFeeback } from '../modules/reducerHandlers';
import {merge} from 'lodash';

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
      const {firstName, lastName, email, phone, subject, message} = action.value;
      writeUserFeeback(firstName, lastName, email, phone, subject, message);
      return state;
    default:
      return state;
  }
};

export default fieldsReducer;
