import ActionTypes from './ActionTypes';
import initialState from './InitialState';

export default (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.LOCAL_STATE_PEOPLE_TYPE_CHANGED:
    return state.set('peopleType', action.payload.get('peopleType'));

  case ActionTypes.LOCAL_STATE_SORT_COLUMN_CHANGED:
    return state.set('sortColumn', action.payload.get('column'));

  case ActionTypes.LOCAL_STATE_SORT_ORDER_CHANGED:
    return state.set('sortOrder', action.payload.get('order'));

  case ActionTypes.LOCAL_STATE_PAGE_NUMBER_CHANGED:
    return state.set('pageNumber', action.payload.get('pageNumber'));

  case ActionTypes.LOCAL_STATE_ROWS_PER_PAGE_CHANGED:
    return state.set('rowsPerPage', action.payload.get('rowsPerPage'));

  default:
    return state;
  }
};
