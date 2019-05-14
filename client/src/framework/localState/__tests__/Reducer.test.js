import Chance from 'chance';
import { Map } from 'immutable';
import reducer from '../Reducer';
import * as actions from '../Actions';

const chance = new Chance();

describe('Local State Actions', () => {
  let state;

  beforeEach(() => {
    state = Map({
      sortColumn: chance.string(),
      sortOrder: chance.string(),
      pageNumber: chance.integer(),
      rowsPerPage: chance.integer(),
    });
  });

  describe('LOCAL_STATE_SORT_COLUMN_CHANGED', () => {
    it('should change the sortColumn property', () => {
      const expectedValue = chance.string();
      const newState = reducer(state, actions.sortColumnChanged(Map({ column: expectedValue })));

      expect(newState.get('sortColumn')).toBe(expectedValue);
    });
  });

  describe('LOCAL_STATE_SORT_ORDER_CHANGED', () => {
    it('should change the sortOrder property', () => {
      const expectedValue = chance.string();
      const newState = reducer(state, actions.sortOrderChanged(Map({ order: expectedValue })));

      expect(newState.get('sortOrder')).toBe(expectedValue);
    });
  });

  describe('LOCAL_STATE_PAGE_NUMBER_CHANGED', () => {
    it('should change the pageNumber property', () => {
      const expectedValue = chance.string();
      const newState = reducer(state, actions.pageNumberChanged(Map({ pageNumber: expectedValue })));

      expect(newState.get('pageNumber')).toBe(expectedValue);
    });
  });

  describe('LOCAL_STATE_ROWS_PER_PAGE_CHANGED', () => {
    it('should change the rowsPerPage property', () => {
      const expectedValue = chance.string();
      const newState = reducer(state, actions.rowsPerPageChanged(Map({ rowsPerPage: expectedValue })));

      expect(newState.get('rowsPerPage')).toBe(expectedValue);
    });
  });
});
