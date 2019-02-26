import {
	FETCH_SENSORS_BEGIN,
	FETCH_SENSORS_SUCCESS,
	FETCH_SENSORS_FAILURE,
	handleErrors
} from './Types';

export const fetchSensorsBegin = () => ({
	type: FETCH_SENSORS_BEGIN
});

export const fetchSensorsSuccess = sensors => ({
	type: FETCH_SENSORS_SUCCESS,
	payload: {
		sensors
	}
});

export const fetchSensorsFailure = error => ({
	type: FETCH_SENSORS_FAILURE,
	payload: {
		error
	}
});

export const fetchSensors = () => dispatch => {
	dispatch(fetchSensorsBegin());
	fetch(process.env.REACT_APP_API_URL+`/api/monitors`)
		.then(handleErrors)
		.then(res => res.json())
		.then(sensors => {
			dispatch(fetchSensorsSuccess(sensors));
		})
		.catch(error => dispatch(fetchSensorsFailure(error)));
};
