import {
    FETCH_PUMPS_BEGIN,
    FETCH_PUMPS_SUCCESS,
    FETCH_PUMPS_FAILURE,
    handleErrors
} from './Types';
import { Globals } from './../Globals';

export const fetchPumpsBegin = () => ({
    type: FETCH_PUMPS_BEGIN
});

export const fetchPumpsSuccess = pumps => ({
    type: FETCH_PUMPS_SUCCESS,
    payload: { pumps }
});

export const fetchPumpsFailure = error => ({
    type: FETCH_PUMPS_FAILURE,
    payload: { error }
});

export const fetchPumps = id => dispatch => {
    dispatch(fetchPumpsBegin());
    fetch(`${Globals.API_URL}/api/pumps/${id}`)
        .then(handleErrors)
        .then(res => res.json())
        .then(pump => {
            console.log("pumps",pump)
            dispatch(fetchPumpsSuccess(pump));
        })
        .catch(error => dispatch(fetchPumpsFailure(error)));
};
