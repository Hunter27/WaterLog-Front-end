import {
    FETCH_LEAK_HISTORY_BEGIN,
    FETCH_LEAK_HISTORY_SUCCESS,
    FETCH_LEAK_HISTORY_FAILURE,
    handleErrors
  } from './Types';
  import { Globals } from './../Globals';
  
  export const fetchLeakHistoryBegin = () => ({
    type: FETCH_LEAK_HISTORY_BEGIN
  });
  
  export const fetchLeakHistorySuccess = history => ({
    type: FETCH_LEAK_HISTORY_SUCCESS,
    payload: { history }
  });
  
  export const fetchLeakHistoryFailure = error => ({
    type: FETCH_LEAK_HISTORY_FAILURE,
    payload: { error }
  });
  
  export const fetchLeakHistory = id => dispatch => {
    dispatch(fetchLeakHistoryBegin());
    fetch(`${Globals.API_URL}/api/segmentleaks/${id}`)
      .then(handleErrors)
      .then(res => res.json())
      .then(leak => {
        dispatch(fetchLeakHistorySuccess(leak));
      })
      .catch(error => dispatch(fetchLeakHistoryFailure(error)));
  };
  