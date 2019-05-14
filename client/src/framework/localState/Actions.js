import ActionTypes from './ActionTypes';

export function peopleTypeChanged(payload) {
  return {
    type: ActionTypes.LOCAL_STATE_PEOPLE_TYPE_CHANGED,
    payload,
  };
}

export function sortColumnChanged(payload) {
  return {
    type: ActionTypes.LOCAL_STATE_SORT_COLUMN_CHANGED,
    payload,
  };
}

export function sortOrderChanged(payload) {
  return {
    type: ActionTypes.LOCAL_STATE_SORT_ORDER_CHANGED,
    payload,
  };
}

export function pageNumberChanged(payload) {
  return {
    type: ActionTypes.LOCAL_STATE_PAGE_NUMBER_CHANGED,
    payload,
  };
}

export function rowsPerPageChanged(payload) {
  return {
    type: ActionTypes.LOCAL_STATE_ROWS_PER_PAGE_CHANGED,
    payload,
  };
}
