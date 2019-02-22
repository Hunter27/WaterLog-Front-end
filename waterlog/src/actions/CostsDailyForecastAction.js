import {
    FETCH_COSTS_FORECAST_BEGIN_DAILY,
    FETCH_COSTS_FORECAST_SUCCESS_DAILY,
    FETCH_COSTS_FORECAST_FAILURE_DAILY,
    handleErrors
} from './Types';

export const fetchCostsForecastDailyBegin = () => ({
    type: FETCH_COSTS_FORECAST_BEGIN_DAILY
});

export const fetchCostsForecastDailySuccess = forecastDaily => ({
    type: FETCH_COSTS_FORECAST_SUCCESS_DAILY,
    payload: {
        forecastDaily
    }
});

export const fetchCostsForecastDailyFailure = error => ({
    type: FETCH_COSTS_FORECAST_FAILURE_DAILY,
    payload: {
        error
    }
});

export const fetchCostsForecastDaily = () => (dispatch) => {
    dispatch(fetchCostsForecastDailyBegin());
    fetch(process.env.REACT_APP_API_URL + `/api/costforecast/daily`)
        .then(handleErrors)
        .then(res => res.json())
        .then(forecastDaily => {
            dispatch(fetchCostsForecastDailySuccess(forecastDaily));
        })
        .catch(error => dispatch(fetchCostsForecastDailyFailure(error)));
};
