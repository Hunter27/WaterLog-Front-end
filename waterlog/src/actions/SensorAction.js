import {
	FETCH_SENSOR_BEGIN,
	FETCH_SENSOR_SUCCESS,
	FETCH_SENSOR_FAILURE,
	handleErrors
} from './Types';

export const fetchSensorBegin = () => ({
	type: FETCH_SENSOR_BEGIN
});

export const fetchSensorSuccess = sensor => ({
	type: FETCH_SENSOR_SUCCESS,
	payload: {
		sensor
	}
});

export const fetchSensorFailure = error => ({
	type: FETCH_SENSOR_FAILURE,
	payload: {
		error
	}
});

export const fetchSensor = (id, date) => dispatch => {
	dispatch(fetchSensorBegin());
	fetch(`${process.env.REACT_APP_API_URL}/api/sensorhistory/sensor/${id}/${date}`)
		.then(handleErrors)
		.then(res => res.json())
		.then(sensor => {
			console.log(sensor);
			dispatch(fetchSensorSuccess(sensor));
		})
		.catch(error => dispatch(fetchSensorFailure(error)));
};
