import _ from "lodash";
import thunk from 'redux-thunk';
import {
    createStore,
    applyMiddleware,
    compose,
} from 'redux';


const initStore = (appReducers, appInitialState) => {
// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;
// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;
​
    if(typeof window !== 'undefined') {
        const url = _.get(window, 'location.href', '');
        const reduxDebugging = (url.indexOf('localhost') > 0);
        const middleWares = reduxDebugging ?
            compose(applyMiddleware(thunk),window.devToolsExtension ? window.devToolsExtension() : f => f) :
            applyMiddleware(thunk);
        return createStore(
            appReducers,
            preloadedState,
            middleWares
        );
    } else {
        return createStore(
            appReducers,
            appInitialState,
            applyMiddleware(thunk)
        );
    }
}
export default initStore;
