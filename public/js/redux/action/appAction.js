import * as types from '../../constants/actionTypes';


export function fetchTodos() {
    return {
        type: types.FETCH_TODOS;
    };
}
