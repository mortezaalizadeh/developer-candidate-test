import { List } from 'immutable';
import ActionTypes from './ActionTypes';
import initialState from './InitialState';
import Status from './Status';

export default (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.PERSON_API_ACKNOWLEDGE_FAILED_OPERATION:
    return state.deleteIn(['failedOperations', action.payload.get('operationId')]);

  case ActionTypes.PERSON_API_SEARCH_PERSONS_SUCCEEDED:
    return state
      .setIn(['searchPersonsOperationsStatus', action.payload.get('operationId')], Status.SUCCEEDED)
      .set('persons', action.payload.get('persons'));

  case ActionTypes.PERSON_API_SEARCH_PERSONS_FAILED:
    return state
      .setIn(['searchPersonsOperationsStatus', action.payload.get('operationId')], Status.FAILED)
      .setIn(['failedOperations', action.payload.get('operationId')], action.payload)
      .set('persons', List());

  case ActionTypes.PERSON_API_SEARCH_PERSONS_IN_PROGRESS:
    return state.setIn(['searchPersonsOperationsStatus', action.payload.get('operationId')], Status.IN_PROGRESS);

  case ActionTypes.PERSON_API_ACKNOWLEDGE_SEARCH_PERSONS_OPERATION:
    return state.deleteIn(['searchPersonsOperationsStatus', action.payload.get('operationId')]);

  case ActionTypes.PERSON_API_DELETE_PERSON_SUCCEEDED:
    return state
      .setIn(['deletePersonOperationsStatus', action.payload.get('operationId')], Status.SUCCEEDED)
      .update('persons', persons => persons.filter(person => person.get('_id') !== action.payload.get('id')));

  case ActionTypes.PERSON_API_DELETE_PERSON_FAILED:
    return state
      .setIn(['deletePersonOperationsStatus', action.payload.get('operationId')], Status.FAILED)
      .setIn(['failedOperations', action.payload.get('operationId')], action.payload);

  case ActionTypes.PERSON_API_DELETE_PERSON_IN_PROGRESS:
    return state.setIn(['deletePersonOperationsStatus', action.payload.get('operationId')], Status.IN_PROGRESS);

  case ActionTypes.PERSON_API_ACKNOWLEDGE_DELETE_PERSON_OPERATION:
    return state.deleteIn(['deletePersonOperationsStatus', action.payload.get('operationId')]);

  default:
    return state;
  }
};
