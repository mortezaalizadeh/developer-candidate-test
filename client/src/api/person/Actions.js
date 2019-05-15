import cuid from 'cuid';
import ActionTypes from './ActionTypes';

export const acknowledgeFailedOperation = payload => ({
  type: ActionTypes.PERSON_API_ACKNOWLEDGE_FAILED_OPERATION,
  payload,
});

export const searchPersons = payload => ({
  type: ActionTypes.PERSON_API_SEARCH_PERSONS,
  payload: payload.set('operationId', cuid()),
});

export const searchPersonsSucceeded = payload => ({
  type: ActionTypes.PERSON_API_SEARCH_PERSONS_SUCCEEDED,
  payload,
});

export const searchPersonsFailed = payload => ({
  type: ActionTypes.PERSON_API_SEARCH_PERSONS_FAILED,
  payload,
});

export const searchPersonsInProgress = payload => ({
  type: ActionTypes.PERSON_API_SEARCH_PERSONS_IN_PROGRESS,
  payload,
});

export const acknowledgeSearchPersonsStatus = payload => ({
  type: ActionTypes.PERSON_API_ACKNOWLEDGE_SEARCH_PERSONS_OPERATION,
  payload,
});

export const deletePerson = payload => ({
  type: ActionTypes.PERSON_API_DELETE_PERSON,
  payload: payload.set('operationId', cuid()),
});

export const deletePersonSucceeded = payload => ({
  type: ActionTypes.PERSON_API_DELETE_PERSON_SUCCEEDED,
  payload,
});

export const deletePersonFailed = payload => ({
  type: ActionTypes.PERSON_API_DELETE_PERSON_FAILED,
  payload,
});

export const deletePersonInProgress = payload => ({
  type: ActionTypes.PERSON_API_DELETE_PERSON_IN_PROGRESS,
  payload,
});

export const acknowledgeDeletePersonStatus = payload => ({
  type: ActionTypes.PERSON_API_ACKNOWLEDGE_DELETE_PERSON_OPERATION,
  payload,
});
