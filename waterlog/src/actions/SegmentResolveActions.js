import {
    FETCH_SEGMENTS_RESOLVED_BEGIN,
    FETCH_SEGMENTS_RESOLVED_SUCCESS,
    FETCH_SEGMENTS_RESOLVED_FAILURE,
    handleErrors
} from './Types';
import { Globals } from './../Globals';

export const fecthSegmentsResolvesBegin = () => ({
    type: FETCH_SEGMENTS_RESOLVED_BEGIN
});

export const fecthSegmentsResolvesSuccess = (leaksResolves) => ({
    type: FETCH_SEGMENTS_RESOLVED_SUCCESS,
    payload: { leaksResolves }
});

export const fecthSegmentsResolvesFailure = (error) => ({
    type: FETCH_SEGMENTS_RESOLVED_FAILURE,
    payload: { error },
    loading: false
});
 
//TODO: Resolve promise hell
export const fetchSegmentsLeaksResolve = id => (dispatch) => {
    dispatch(fecthSegmentsResolvesBegin());
    return fetch(process.env.REACT_APP_API_URL+`/api/segmentleaks/${id}`)
        .then(handleErrors)
        .then((res) => res.json())
        .then((leaksResolves) => {
            dispatch(fecthSegmentsResolvesSuccess(leaksResolves));
        })
        .catch((error) => {
            dispatch(fecthSegmentsResolvesFailure(error));
        });
}; 
