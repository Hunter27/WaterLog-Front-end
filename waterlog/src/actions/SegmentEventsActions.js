import {
    FETCH_SEGMENTS_EVENTS_BEGIN,
    FETCH_SEGMENTS_EVENTS_SUCCESS,
    FETCH_SEGMENTS_EVENTS_FAILURE,
    handleErrors
} from './Types';
import { Globals } from './../Globals';

export const fecthSegmentsResolvesBegin = () => ({
    type: FETCH_SEGMENTS_EVENTS_BEGIN
});

export const fecthSegmentsResolvesSuccess = (leaksResolves) => ({
    type: FETCH_SEGMENTS_EVENTS_SUCCESS,
    payload: { leaksResolves }
});

export const fecthSegmentsResolvesFailure = (error) => ({
    type: FETCH_SEGMENTS_EVENTS_FAILURE,
    payload: { error },
    loading: false
});

//TODO: Resolve promise hell
export const fetchSegmentsLeaksResolve = id => (dispatch) => {
    dispatch(fecthSegmentsResolvesBegin());
    return fetch(`${Globals.API_URL}/api/segmentevents/${id}`)
        .then(handleErrors)
        .then((res) => res.json())
        .then((leaksResolves) => {
            dispatch(fecthSegmentsResolvesSuccess(leaksResolves));
        })
        .catch((error) => {
            dispatch(fecthSegmentsResolvesFailure(error));
        });
};

