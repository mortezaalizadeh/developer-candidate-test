import ActionTypes from './ActionTypes';

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
