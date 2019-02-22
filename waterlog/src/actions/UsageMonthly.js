import {
    FETCH_USAGE_MONTHLY_BEGIN,
    FETCH_USAGE_MONTHLY_FAILURE,
    FETCH_USAGE_MONTHLY_SUCCESS,
    handleErrors
} from "./Types";

export const fetchhUsageMonthlyBegin = () => ({
    type: FETCH_USAGE_MONTHLY_BEGIN
});

export const fetchUsageMonthlySuccess = (monthlyUsage) => ({
    type: FETCH_USAGE_MONTHLY_SUCCESS,
    payload: { monthlyUsage },
    loading: false
});

export const fetchUsageMonthlyFailure = (error) => ({
    type: FETCH_USAGE_MONTHLY_FAILURE,
    payload: { error },
    loading: false
});

export const fetchUsageMonthly = () => (dispatch) => {
    dispatch(fetchhUsageMonthlyBegin())
    fetch(process.env.REACT_APP_API_URL + `/api/segmentevents/monthlyusage`) 
        .then(handleErrors)
        .then(res => res.json())
        .then(monthlyUsage => {
            dispatch(fetchUsageMonthlySuccess(monthlyUsage));
        })
        .catch((error) => {
            dispatch(fetchUsageMonthlyFailure(error));
        });
}; 
