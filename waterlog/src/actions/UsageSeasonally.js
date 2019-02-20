import { FETCH_USAGE_SEASONALLY_BEGIN, FETCH_USAGE_SEASONALLY_FAILURE, FETCH_USAGE_SEASONALLY_SUCCESS, handleErrors } from "./Types";
import { Globals } from './../Globals';
export const fetchhUsageSeasonallyBegin = () => ({
    type: FETCH_USAGE_SEASONALLY_BEGIN
});

export const fetchUsageSeasonallySuccess = (seasonUsage) => ({
    type: FETCH_USAGE_SEASONALLY_SUCCESS,
    payload: { seasonUsage },
    loading: false
});

export const fetchUsageSeasonallyFailure = (error) => ({
    type: FETCH_USAGE_SEASONALLY_FAILURE,
    payload: { error },
    loading: false
});

export const fetchUsageSeasonally = () => (dispatch) => {
    dispatch(fetchhUsageSeasonallyBegin())
    fetch(process.env.REACT_APP_API_URL + `/api/segmentevents/seasonallyusage`) //Change to use either localhost/server
        .then(handleErrors)
        .then(res => res.json())
        .then(seasonUsage => {
            dispatch(fetchUsageSeasonallySuccess(seasonUsage));
        })
        .catch((error) => {
            dispatch(fetchUsageSeasonallyFailure(error));
        });
}; 
