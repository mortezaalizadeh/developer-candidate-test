import cuid from 'cuid';
import ActionTypes from './ActionTypes';

export function acknowledgeFailedOperation(payload) {
  return {
    type: ActionTypes.PERSON_API_ACKNOWLEDGE_FAILED_OPERATION,
    payload,
  };
}

export function searchPersons(payload) {
  return {
    type: ActionTypes.PERSON_API_SEARCH_PERSONS,
    payload: payload.set('operationId', cuid()),
  };
}

export function searchPersonsSucceeded(payload) {
  return {
    type: ActionTypes.PERSON_API_SEARCH_PERSONS_SUCCEEDED,
    payload,
  };
}

export function searchPersonsFailed(payload) {
  return {
    type: ActionTypes.PERSON_API_SEARCH_PERSONS_FAILED,
    payload,
  };
}

export function searchPersonsInProgress(payload) {
  return {
    type: ActionTypes.PERSON_API_SEARCH_PERSONS_IN_PROGRESS,
    payload,
  };
}

export function acknowledgeSearchPersonsStatus(payload) {
  return {
    type: ActionTypes.PERSON_API_ACKNOWLEDGE_SEARCH_PERSONS_OPERATION,
    payload,
  };
}

export function deletePersons(payload) {
  return {
    type: ActionTypes.PERSON_API_DELETE_PERSON,
    payload: payload.set('operationId', cuid()),
  };
}

export function deletePersonsSucceeded(payload) {
  return {
    type: ActionTypes.PERSON_API_DELETE_PERSON_SUCCEEDED,
    payload,
  };
}

export function deletePersonsFailed(payload) {
  return {
    type: ActionTypes.PERSON_API_DELETE_PERSON_FAILED,
    payload,
  };
}

export function deletePersonsInProgress(payload) {
  return {
    type: ActionTypes.PERSON_API_DELETE_PERSON_IN_PROGRESS,
    payload,
  };
}

export function acknowledgeDeletePersonsStatus(payload) {
  return {
    type: ActionTypes.PERSON_API_ACKNOWLEDGE_DELETE_PERSON_OPERATION,
    payload,
  };
}
