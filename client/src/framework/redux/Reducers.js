// @flow

import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

export default function getReducers() {
  return combineReducers({
    form: formReducer,
  });
}
