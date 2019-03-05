import {
	FETCH_ALERTS_BEGIN,
	FETCH_ALERTS_SUCCESS,
	FETCH_ALERTS_FAILURE,
	FETCH_FILTERED_ALERTS_BEGIN,
	FETCH_FILTERED_ALERTS_SUCCESS,
	FETCH_FILTERED_ALERTS_FAILURE,
	handleErrors
} from './Types'; 

export const fetchFilteredAlertsBegin =()=>({
	type: FETCH_FILTERED_ALERTS_BEGIN
});

export const fetchFilteredAlertsSuccess = alerts =>({
	type: FETCH_FILTERED_ALERTS_SUCCESS,
	payload:{alerts} 
});

export const fetchFilteredAlertsFailure = error =>({
	type: FETCH_FILTERED_ALERTS_FAILURE,
	payload: {error}
})

export const fetchAlertsBegin = () => ({
	type: FETCH_ALERTS_BEGIN
});

export const fetchAlertsSuccess = alerts => ({
	type: FETCH_ALERTS_SUCCESS,
	payload: {
		alerts,
		total: alerts.filter(alert => alert.status === 2).length
	}
});

export const fetchAlertsFailure = error => ({
	type: FETCH_ALERTS_FAILURE,
	payload: {
		error
	}
});

export const fetchAlerts = (id) => dispatch => {
	dispatch(fetchAlertsBegin());
	fetch(`${process.env.REACT_APP_API_URL}/api/segmentevents/getalerts/`+id)
		.then(handleErrors)
		.then(res => res.json())
		.then(alerts => {
			dispatch(fetchAlertsSuccess(alerts));
		})
		.catch(error => dispatch(fetchAlertsFailure(error)));
};

export const fetchFilteredAlerts =() => dispatch =>{
	dispatch(fetchFilteredAlertsBegin());
	fetch(`${process.env.REACT_APP_API_URL}api/segmentevents/getalertsfilter?segment=5&sensorId=1&sensortype=2&severity=3`)
	.then(handleErrors)
	.then(res => res.json())
	.then(alerts=>{
		dispatch(fetchAlertsSuccess(alerts));
	})
	.catch(error => dispatch(fetchFilteredAlertsFailure(error)))
};