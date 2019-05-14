import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import getReducers from './Reducers';
import { watchSearchPersons, watchDeletePersons } from '../../api/person';

const rootSagas = function* sagas() {
  yield all([watchSearchPersons(), watchDeletePersons()]);
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
