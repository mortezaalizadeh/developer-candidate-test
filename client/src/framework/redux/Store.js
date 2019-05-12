// @flow

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import getReducers from './Reducers';

const rootSagas = function* sagas() {
  yield [];
};

const configureStore = initialState => {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = applyMiddleware(sagaMiddleware);
  const store = createStore(getReducers(), initialState, middleware);

  sagaMiddleware.run(rootSagas);

  return store;
};

const reduxStore = configureStore();

export default reduxStore;
