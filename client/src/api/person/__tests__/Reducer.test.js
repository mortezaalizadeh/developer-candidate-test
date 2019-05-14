import Chance from 'chance';
import { Range, List, Map } from 'immutable';
import reducer from '../Reducer';
import Status from '../Status';
import * as actions from '../Actions';

const chance = new Chance();

describe('Local State Actions', () => {
  let state;

  beforeEach(() => {
    state = Map({
      failedOperations: Map(),
      persons: List(),
      searchPersonsOperationsStatus: Map(),
      deletePersonsOperationsStatus: Map(),
    });
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
      const persons = Range(0, chance.integer({ min: 0, max: 10 }))
        .map(() => Map({ name: chance.string(), age: chance.integer(), gender: chance.string() }))
        .toList();
      const newState = reducer(state, actions.searchPersonsSucceeded(Map({ persons })));

      expect(newState.get('persons')).toBe(persons);
    });
  });
});
