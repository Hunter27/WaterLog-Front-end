import {
    FETCH_SEGMENT_EVENTS_BEGIN,
    FETCH_SEGMENT_EVENTS_SUCCESS,
    FETCH_SEGMENT_EVENTS_FAILURE,
    handleErrors
  } from "./Types";
  import { Globals } from "./../Globals";
  
  export const fecthSegmentEventsBegin = () => ({
    type: FETCH_SEGMENT_EVENTS_BEGIN
  });
  
  export const fecthSegmentEventsSuccess = events => ({
    type: FETCH_SEGMENT_EVENTS_SUCCESS,
    payload: { events }
  });
  
  export const fecthSegmentEventsFailure = error => ({
    type: FETCH_SEGMENT_EVENTS_FAILURE,
    payload: { error },
    loading: false
  });
  
  export const fetchSegmentEvents = () => dispatch => {
    dispatch(fecthSegmentEventsBegin());
  
    return fetch(`${Globals.API_URL}/api/segmentevents`)
      .then(handleErrors)
      .then(res => res.json())
      .then(events => {
        dispatch(fecthSegmentEventsSuccess(events)); 
      })
      .catch(error => {
        dispatch(fecthSegmentEventsFailure(error));
      });
  };