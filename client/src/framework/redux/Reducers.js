import { combineReducers } from 'redux';
import { PersonApiReducer } from '../../api/person';
import { LocalStateReducer } from '../localState';

export default function getReducers() {
  return combineReducers({
    personApi: PersonApiReducer,
    localState: LocalStateReducer,
  });
}
