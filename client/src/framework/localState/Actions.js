import ActionTypes from './ActionTypes';

export const sortColumnChanged = payload => ({
  type: ActionTypes.LOCAL_STATE_SORT_COLUMN_CHANGED,
  payload,
});

export const sortOrderChanged = payload => ({
  type: ActionTypes.LOCAL_STATE_SORT_ORDER_CHANGED,
  payload,
});

export const pageNumberChanged = payload => ({
  type: ActionTypes.LOCAL_STATE_PAGE_NUMBER_CHANGED,
  payload,
});

export const rowsPerPageChanged = payload => ({
  type: ActionTypes.LOCAL_STATE_ROWS_PER_PAGE_CHANGED,
  payload,
});
