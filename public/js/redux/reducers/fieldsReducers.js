import * as types from '../../constants/actionTypes';


const fieldsReducer = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_TODOS:
      return action.payload;
    case types.UPDATE_FIELD:
      const newState = Object.assign({}, state);
      return _.merge(newState, action.value);
    default:
      return state;
  }
};

export default fieldsReducer;