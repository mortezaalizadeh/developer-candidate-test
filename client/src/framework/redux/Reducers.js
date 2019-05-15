import { combineReducers } from 'redux';
import { PersonApiReducer } from '../../api/person';
import { LocalStateReducer } from '../localState';

const getReducers = () =>
  combineReducers({
    personApi: PersonApiReducer,
    localState: LocalStateReducer,
  });

export default getReducers;
