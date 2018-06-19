import * as types from '../../constants/actionTypes';


const fieldsReducer = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_TODOS:
      return action.payload;
    default:
      return state;
  }
};

export default fieldsReducer;
