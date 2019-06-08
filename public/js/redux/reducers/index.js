import { combineReducers } from 'redux';
import fieldsReducer from './fieldsReducers';
import appReducer from './appReducers';

const combinedReducers = combineReducers({
  fieldState: fieldsReducer,
  appState: appReducer,
});


export default combinedReducers;
