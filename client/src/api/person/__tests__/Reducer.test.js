import Chance from 'chance';
import { Range, Map } from 'immutable';
import reducer from '../Reducer';
import Status from '../Status';
import * as actions from '../Actions';

const chance = new Chance();

describe('Local State Actions', () => {
  let state;
  let persons;

  beforeEach(() => {
    state = Map({
      failedOperations: Map(),
      persons: Range(0, chance.integer({ min: 5, max: 10 }))
        .map(() => Map({ _id: chance.string(), name: chance.string(), age: chance.integer(), gender: chance.string() }))
        .toList(),
      searchPersonsOperationsStatus: Map(),
      deletePersonOperationsStatus: Map(),
    });
    persons = Range(0, chance.integer({ min: 5, max: 10 }))
      .map(() => Map({ _id: chance.string(), name: chance.string(), age: chance.integer(), gender: chance.string() }))
      .toList();
  });

  describe('PERSON_API_ACKNOWLEDGE_FAILED_OPERATION', () => {
    it('should remove the previously added failed operations', () => {
      const operationId = chance.string();

      state = state.setIn(['failedOperations', operationId], Map());

      const newState = reducer(state, actions.acknowledgeFailedOperation(Map({ operationId })));

      expect(newState.hasIn(['faildOperations', operationId])).toBeFalsy();
    });
  });

  describe('PERSON_API_SEARCH_PERSONS_SUCCEEDED', () => {
    it('should set searchPersonsOperationsStatus to for the specific operation to SUCCEEDED', () => {
      const operationId = chance.string();

      state = state.setIn(['searchPersonsOperationsStatus', operationId], Status.IN_PROGRESS);

      const newState = reducer(state, actions.searchPersonsSucceeded(Map({ operationId })));

      expect(newState.getIn(['searchPersonsOperationsStatus', operationId])).toBe(Status.SUCCEEDED);
    });

    it('should set the persons list provided in the payload', () => {
      const newState = reducer(state, actions.searchPersonsSucceeded(Map({ persons })));

      expect(newState.get('persons')).toBe(persons);
    });
  });

  describe('PERSON_API_SEARCH_PERSONS_FAILED', () => {
    it('should set searchPersonsOperationsStatus to for the specific operation to FAILED', () => {
      const operationId = chance.string();

      state = state.setIn(['searchPersonsOperationsStatus', operationId], Status.IN_PROGRESS);

      const newState = reducer(state, actions.searchPersonsFailed(Map({ operationId })));

      expect(newState.getIn(['searchPersonsOperationsStatus', operationId])).toBe(Status.FAILED);
    });

    it('should add the failed operation to the list failedOperations', () => {
      const operationId = chance.string();
      const errorMessage = chance.string();
      const newState = reducer(state, actions.searchPersonsFailed(Map({ operationId, errorMessage })));

      expect(newState.get('failedOperations').has(operationId)).toBeTruthy();
      expect(newState.get('failedOperations').getIn([operationId, 'operationId'])).toBe(operationId);
      expect(newState.get('failedOperations').getIn([operationId, 'errorMessage'])).toBe(errorMessage);
    });

    it('should set the persons list to empty', () => {
      const newState = reducer(state, actions.searchPersonsFailed(Map({ operationId: chance.string() })));

      expect(newState.get('persons').count()).toBe(0);
    });
  });

  describe('PERSON_API_SEARCH_PERSONS_IN_PROGRESS', () => {
    it('should set searchPersonsOperationsStatus to for the specific operation to IN_PROGRESS', () => {
      const operationId = chance.string();

      state = state.setIn(['searchPersonsOperationsStatus', operationId], Status.FAILED);

      const newState = reducer(state, actions.searchPersonsInProgress(Map({ operationId })));

      expect(newState.getIn(['searchPersonsOperationsStatus', operationId])).toBe(Status.IN_PROGRESS);
    });
  });

  describe('PERSON_API_ACKNOWLEDGE_SEARCH_PERSONS_OPERATION', () => {
    it('should remove the search persons operation from the list', () => {
      const operationId = chance.string();

      state = state.setIn(['searchPersonsOperationsStatus', operationId], Status.SUCCEEDED);

      const newState = reducer(state, actions.acknowledgeSearchPersonsStatus(Map({ operationId })));

      expect(newState.hasIn(['searchPersonsOperationsStatus', operationId])).toBeFalsy();
    });
  });

  describe('PERSON_API_DELETE_PERSON_SUCCEEDED', () => {
    it('should set deletePersonOperationsStatus to for the specific operation to SUCCEEDED', () => {
      const operationId = chance.string();

      state = state.setIn(['deletePersonOperationsStatus', operationId], Status.IN_PROGRESS);

      const newState = reducer(state, actions.deletePersonSucceeded(Map({ operationId })));

      expect(newState.getIn(['deletePersonOperationsStatus', operationId])).toBe(Status.SUCCEEDED);
    });

    it('should remove the deleted persons from the list', () => {
      const operationId = chance.string();
      const personIdToRemove = state
        .get('persons')
        .first()
        .get('_id');
      const newState = reducer(state, actions.deletePersonSucceeded(Map({ operationId, id: personIdToRemove })));

      expect(newState.get('persons').find(person => person.get('_id') === personIdToRemove)).toBeUndefined();
    });
  });

  describe('PERSON_API_DELETE_PERSON_FAILED', () => {
    it('should set deletePersonOperationsStatus to for the specific operation to FAILED', () => {
      const operationId = chance.string();

      state = state.setIn(['deletePersonOperationsStatus', operationId], Status.IN_PROGRESS);

      const newState = reducer(state, actions.deletePersonFailed(Map({ operationId })));

      expect(newState.getIn(['deletePersonOperationsStatus', operationId])).toBe(Status.FAILED);
    });

    it('should add the failed operation to the list failedOperations', () => {
      const operationId = chance.string();
      const errorMessage = chance.string();
      const newState = reducer(state, actions.deletePersonFailed(Map({ operationId, errorMessage })));

      expect(newState.get('failedOperations').has(operationId)).toBeTruthy();
      expect(newState.get('failedOperations').getIn([operationId, 'operationId'])).toBe(operationId);
      expect(newState.get('failedOperations').getIn([operationId, 'errorMessage'])).toBe(errorMessage);
    });
  });

  describe('PERSON_API_DELETE_PERSON_IN_PROGRESS', () => {
    it('should set deletePersonOperationsStatus to for the specific operation to IN_PROGRESS', () => {
      const operationId = chance.string();

      state = state.setIn(['deletePersonOperationsStatus', operationId], Status.FAILED);

      const newState = reducer(state, actions.deletePersonInProgress(Map({ operationId })));

      expect(newState.getIn(['deletePersonOperationsStatus', operationId])).toBe(Status.IN_PROGRESS);
    });
  });

  describe('PERSON_API_ACKNOWLEDGE_DELETE_PERSON_OPERATION', () => {
    it('should remove the delete person operation from the list', () => {
      const operationId = chance.string();

      state = state.setIn(['deletePersonOperationsStatus', operationId], Status.SUCCEEDED);

      const newState = reducer(state, actions.acknowledgeDeletePersonStatus(Map({ operationId })));

      expect(newState.hasIn(['deletePersonOperationsStatus', operationId])).toBeFalsy();
    });
  });
});
