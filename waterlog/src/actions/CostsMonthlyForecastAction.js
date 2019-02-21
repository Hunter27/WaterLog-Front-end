import {
    FETCH_COSTS_FORECAST_BEGIN_MONTHLY,
    FETCH_COSTS_FORECAST_SUCCESS_MONTHLY,
    FETCH_COSTS_FORECAST_FAILURE_MONTHLY,
    handleErrors
} from './Types';

export const fetchCostsForecastMonthlyBegin = () => ({
    type: FETCH_COSTS_FORECAST_BEGIN_MONTHLY
});

export const fetchCostsForecastMonthlySuccess = forecastMonthly => ({
    type: FETCH_COSTS_FORECAST_SUCCESS_MONTHLY,
    payload: {
        forecastMonthly
    }
});

export const fetchCostsForecastMonthlyFailure = error => ({
    type: FETCH_COSTS_FORECAST_FAILURE_MONTHLY,
    payload: {
        error
    }
});

export const fetchCostsForecastMonthly = () => (dispatch) => {
    dispatch(fetchCostsForecastMonthlyBegin());
    fetch(process.env.REACT_APP_API_URL + `/api/costforecast/monthly`)
        .then(handleErrors)
        .then(res => res.json())
        .then(forecastMonthly => {
            dispatch(fetchCostsForecastMonthlySuccess(forecastMonthly));
        })
        .catch(error => dispatch(fetchCostsForecastMonthlyFailure(error)));
}; 
