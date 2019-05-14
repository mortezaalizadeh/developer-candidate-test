import { call, put, takeLatest } from 'redux-saga/effects';
import superagent from 'superagent';
import Immutable, { Map } from 'immutable';
import ActionTypes from './ActionTypes';
import * as Actions from './Actions';
import Config from '../../framework/config';

const searchPersons = async criteria => superagent.get(Config.apiServerEndpoint + '/persons' + (criteria ? '?' + criteria : ''));

function* searchPersonsAsync(action) {
  try {
    yield put(Actions.searchPersonsInProgress(action.payload));

    let criteria = '';
    const gender = action.payload.getIn(['criteria', 'gender']);
    const age_lt = action.payload.getIn(['criteria', 'age_lt']);
    const age_gte = action.payload.getIn(['criteria', 'age_gte']);

    if (gender) {
      if (criteria) {
        criteria += `&gender=${gender}`;
      } else {
        criteria += `gender=${gender}`;
      }
    }

    if (age_lt) {
      if (criteria) {
        criteria += `&age_lt=${age_lt}`;
      } else {
        criteria += `age_lt=${age_lt}`;
      }
    }

    if (age_gte) {
      if (criteria) {
        criteria += `&age_gte=${age_gte}`;
      } else {
        criteria += `age_gte=${age_gte}`;
      }
    }

    const result = yield call(searchPersons, criteria);

    yield put(Actions.searchPersonsSucceeded(Map({ persons: Immutable.fromJS(result.body) })));
  } catch (exception) {
    yield put(Actions.searchPersonsFailed(action.payload.set('errorMessage', exception.message)));
  }
}

export default function* watchSearchPersons() {
  yield takeLatest(ActionTypes.PERSON_API_SEARCH_PERSONS, searchPersonsAsync);
}
