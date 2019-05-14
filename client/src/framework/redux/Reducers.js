// @flow

import { combineReducers } from 'redux';

export default function getReducers() {
  return combineReducers({
    notification: null,
  });
}
