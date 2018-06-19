import _ from "lodash";
import thunk from 'redux-thunk';
import {
    createStore,
    applyMiddleware,
    compose,
} from 'redux';


const initStore = (appReducers, appInitialState) => {
    if(typeof window !== 'undefined') {
        const url = _.get(window, 'location.href', '');
        const reduxDebugging = (url.indexOf('localhost') > 0);
        const middleWares = reduxDebugging ?
            compose(applyMiddleware(thunk),window.devToolsExtension ? window.devToolsExtension() : f => f) :
            applyMiddleware(thunk);
        return createStore(
            appReducers,
            appInitialState,
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
