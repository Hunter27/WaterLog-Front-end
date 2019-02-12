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

export const fecthSegmentEventsSuccess = leaksResolves => ({
  type: FETCH_SEGMENT_EVENTS_SUCCESS,
  payload: { leaksResolves }
});

export const fecthSegmentEventsFailure = error => ({
  type: FETCH_SEGMENT_EVENTS_FAILURE,
  payload: { error },
  loading: false
});

//TODO: Resolve promise hell
export const fetchSegmentsLeaksResolve = id => dispatch => {
  dispatch(fecthSegmentEventsBegin());
  return fetch(`${Globals.API_URL}/api/segmentevents/${id}`)
    .then(handleErrors)
    .then(res => res.json())
    .then(leaksResolves => {
      dispatch(fecthSegmentEventsSuccess(leaksResolves));
    })
    .catch(error => {
      dispatch(fecthSegmentEventsFailure(error));
    });
};
