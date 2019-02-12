
import {
    FETCH_SEGMENT_EVENTS_BEGIN,
    FETCH_SEGMENT_EVENTS_SUCCESS,
    FETCH_SEGMENT_EVENTS_FAILURE,
    handleErrors
} from './Types';
import { Globals } from './../Globals';

export const fetchSegmentEventsBegin = () => ({
    type: FETCH_SEGMENT_EVENTS_BEGIN
});

export const fetchSegmentEventsSuccess = events => ({
    type: FETCH_SEGMENT_EVENTS_SUCCESS,
    payload: { events }
});

export const fetchSegmentEventsFailure = error => ({
    type: FETCH_SEGMENT_EVENTS_FAILURE,
    payload: { error }
});

export const fetchLeakLitres = id => dispatch => {
    dispatch(fetchSegmentEventsSuccess());
    fetch(`${Globals.API_URL}/api/segmentevents${id}`)
        .then(handleErrors)
        .then(res => res.json())
        .then(leak => {
            dispatch(fetchSegmentEventsSuccess(leak));
        })
        .catch(error => dispatch(fetchSegmentEventsFailure(error)));
};
