// @flow

import { combineReducers } from 'redux';
import { PersonApiReducer } from '../../api/person';

export default function getReducers() {
  return combineReducers({
    personApi: PersonApiReducer,
  });
}
