import { call, put, takeEvery } from 'redux-saga/effects';
import superagent from 'superagent';
import ActionTypes from './ActionTypes';
import * as Actions from './Actions';
import Config from '../../framework/config';

const deletePerson = async id => superagent.delete(Config.apiServerEndpoint + '/persons/' + id);

function* deletePersonAsync(action) {
  try {
    yield put(Actions.deletePersonInProgress(action.payload));
    yield call(deletePerson, action.payload.get('id'));
    yield put(Actions.deletePersonSucceeded(action.payload));
  } catch (exception) {
    yield put(Actions.deletePersonFailed(action.payload.set('errorMessage', exception.message)));
  }
}

export default function* watchDeletePerson() {
  yield takeEvery(ActionTypes.PERSON_API_DELETE_PERSON, deletePersonAsync);
}
