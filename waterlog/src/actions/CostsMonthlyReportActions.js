import {
    FETCH_COSTS_MONTHLY_BEGIN,
    FETCH_COSTS_MONTHLY_SUCCESS,
    FETCH_COSTS_MONTHLY_FAILURE,
    handleErrors
} from './Types';

export const fetchCostsMonthlyBegin = () => ({
    type: FETCH_COSTS_MONTHLY_BEGIN
});

export const fetchCostsMonthlySuccess = monthlyCost => ({
    type: FETCH_COSTS_MONTHLY_SUCCESS,
    payload: {
        monthlyCost
    }
});

export const fetchCostsMonthlyFailure = error => ({
    type: FETCH_COSTS_MONTHLY_FAILURE,
    payload: {
        error
    }
});

export const fetchCostsMonthly = () => (dispatch) => {
    dispatch(fetchCostsMonthlyBegin());
    fetch(process.env.REACT_APP_API_URL + `/api/segmentevents/monthlyCost`)
        .then(handleErrors)
        .then(res => res.json())
        .then(monthlyCost => {
            dispatch(fetchCostsMonthlySuccess(monthlyCost));
        })
        .catch(error => dispatch(fetchCostsMonthlyFailure(error)));
};
