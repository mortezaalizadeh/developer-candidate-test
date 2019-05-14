import { call, put, takeLatest } from 'redux-saga/effects';
import superagent from 'superagent';
import Immutable, { Map } from 'immutable';
import ActionTypes from './ActionTypes';
import * as Actions from './Actions';
import Config from '../../framework/config';

const searchPersons = async () => {
  return await superagent.get(Config.apiServerEndpoint + '/persons');
};

function* searchPersonsAsync(action) {
  try {
    yield put(Actions.searchPersonsInProgress(action.payload));

    const result = yield call(searchPersons);

    yield put(Actions.searchPersonsSucceeded(Map({ persons: Immutable.fromJS(result.body) })));
  } catch (exception) {
    yield put(Actions.searchPersonsFailed(action.payload.set('errorMessage', exception.message)));
  }
}

export default function* watchSearchPersons() {
  yield takeLatest(ActionTypes.PERSON_API_SEARCH_PERSONS, searchPersonsAsync);
}
