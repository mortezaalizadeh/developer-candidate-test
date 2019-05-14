import { select, call, put, takeEvery } from 'redux-saga/effects';
import superagent from 'superagent';
import Immutable, { Map } from 'immutable';
import ActionTypes from './ActionTypes';
import * as Actions from './Actions';
import Config from '../../framework/config';

const deletePersons = async id => superagent.delete(Config.apiServerEndpoint + '/persons/' + id);

function* deletePersonsAsync(action) {
  try {
    yield put(Actions.deletePersonsInProgress(action.payload));

    const result = yield call(deletePersons, action.payload.get('id'));

    yield put(Actions.deletePersonsSucceeded(Map({ persons: Immutable.fromJS(result.body) })));

    const state = yield select();
    const peopleType = state.localState.get('peopleType');

    if (peopleType === 'everybody') {
      yield put(Actions.searchPersons(Map()));
    } else if (peopleType === 'male') {
      yield put(Actions.searchPersons(Map({ criteria: Map({ gender: 'male' }) })));
    } else if (peopleType === 'female') {
      yield put(Actions.searchPersons(Map({ criteria: Map({ gender: 'female' }) })));
    } else if (peopleType === 'over30') {
      yield put(Actions.searchPersons(Map({ criteria: Map({ age_gte: 30 }) })));
    } else if (peopleType === 'under30') {
      yield put(Actions.searchPersons(Map({ criteria: Map({ age_lt: 30 }) })));
    }
  } catch (exception) {
    yield put(Actions.deletePersonsFailed(action.payload.set('errorMessage', exception.message)));
  }
}

export default function* watchDeletePersons() {
  yield takeEvery(ActionTypes.PERSON_API_DELETE_PERSON, deletePersonsAsync);
}
