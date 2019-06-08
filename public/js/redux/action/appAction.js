import * as types from '../../constants/actionTypes';


export default function fetchTodos() {
  return {
    type: types.FETCH_TODOS,
  };
}
