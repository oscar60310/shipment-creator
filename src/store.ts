/* global ENV */
import { applyMiddleware, createStore } from 'redux';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';
import { RootReducer } from './reducers';

let middleware;
if (ENV.name === 'develop') {
  middleware = applyMiddleware(thunk, logger);
} else {
  middleware = applyMiddleware(thunk);
}
const store = createStore(RootReducer, middleware);
export default store;
