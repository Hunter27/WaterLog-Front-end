import {
	FECTH_FORECAST_BEGIN,
	FECTH_FORECAST_SUCCESS,
	FECTH_FORECAST_FAILURE,
	handleErrors
} from './Types';
import { Globals } from '../Globals';

export const ForecastType = {
	DAILY: 'daily',
	MONTHLY: 'monthly',
	SEASONAL: 'seasonal'
};

export const generateLinearForecastBegin = () => ({
	type: FECTH_FORECAST_BEGIN
});

export const generateLinearForecastSuccess = (lineParameters, type) => {
	const yint = lineParameters.yIntercept;
	const slope = lineParameters.slope;

	var y = [];
	var x = [];
	var start = lineParameters.start;
  var limit = start*lineParameters.change;
  console.log(lineParameters)
	var change = 0;
	if (type === ForecastType.DAILY) {
    change = 3600;
    limit = 24*change + start;
	} else if (type === ForecastType.MONTHLY) {
    change = 86400;
    limit = 28*change + start;
	}
	//TODO forecast for seasonally

	var count = 0;
	for (var i = start; i < limit; i = i + change) {
		x.push(i);
		y.push(slope * i + yint);
		//redo calculation {get start value from DB}
  }
  const dataset = {x,y,type}
	return {
		type: FECTH_FORECAST_SUCCESS,
		payload: { dataset }
	};
};

export const generateLinearForecastFailure = (error) => ({
	type: FECTH_FORECAST_FAILURE,
	payload: { error }
});

export const generateLinearForecast = (type = ForecastType.DAILY) => (dispatch) => {
	dispatch(generateLinearForecastBegin());
	fetch(`${Globals.API_URL}/api/costforecast/${type}`)
		.then(handleErrors)
		.then((res) => res.json())
		.then((linearData) => {
			dispatch(generateLinearForecastSuccess(linearData, type));
			return linearData;
		})
		.catch((error) => dispatch(generateLinearForecastFailure(error)));
};
