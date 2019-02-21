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
async function getMonthlyForecast(dispatch) {
    let arr = []
    for (let i = 1; i <= 12; i++) {
        let f = await getMonthForecast(i).then(seg => arr.push(seg)).catch(error => {
            dispatch(fetchCostsForecastMonthlyFailure(error));
        });
    }

    return arr;
}

async function getMonthForecast(id) {
    const response = await fetch(process.env.REACT_APP_API_URL + `/api/costforecast/monthly/${id}`);
    const data = await response.json();
    return data;
}
export const fetchCostsForecastMonthly =  () => async (dispatch) => {
    dispatch(fetchCostsForecastMonthlyBegin());

    let results = await getMonthlyForecast(dispatch);



    dispatch(fetchCostsForecastMonthlySuccess(forecastMonthly)
}; 
