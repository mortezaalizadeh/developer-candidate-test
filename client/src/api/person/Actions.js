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
