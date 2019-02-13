import { FECTH_FORECAST_BEGIN, FECTH_FORECAST_SUCCESS, FECTH_FORECAST_FAILURE, handleErrors } from './Types';
import { Globals } from '../Globals';

export const ForecastType = {
	DAILY: 'daily',
	MONTHLY: 'monthly',
	SEASONAL: 'seasonal'
};

export const generateLinearForecastBegin = () => ({
	type: FECTH_FORECAST_BEGIN
});

export const generateLinearForecastSuccess = (lineParameters) => ({
	type: FECTH_FORECAST_SUCCESS,
	payload: { lineParameters }
});

export const generateLinearForecastFailure = (error) => ({
	type: FECTH_FORECAST_FAILURE,
	payload: { error }
});

export const generateLinearForecast = (type = ForecastType.DAILY) => (dispatch) => {

  
  dispatch(generateLinearForecastBegin());
  console.log("here")
  console.log(`${Globals.API_URL}/api/costforecast/${type}`)

  fetch(`${Globals.API_URL}/api/costforecast/${type}`)
		.then(handleErrors)
		.then((res) => res.json())
		.then((linearData) => {
      dispatch(generateLinearForecastSuccess(linearData));
      console.log("l",linearData)
      return linearData;
    })
    .catch(error => dispatch(generateLinearForecastFailure(error)))
};
