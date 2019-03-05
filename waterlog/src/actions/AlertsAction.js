import {
	FETCH_ALERTS_BEGIN,
	FETCH_ALERTS_SUCCESS,
	FETCH_ALERTS_FAILURE,
	FETCH_FILTERED_ALERTS_BEGIN,
	FETCH_FILTERED_ALERTS_SUCCESS,
	FETCH_FILTERED_ALERTS_FAILURE,
	GET_PAGE_NUMBER,
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
	payload: {
		error: error.message
	}
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
		error: error.message
	}
});

export const fetPageNumber = () => ({
	type: GET_PAGE_NUMBER
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

export const fetchFilteredAlerts =(segment, sensorId, sensortype, severity) => dispatch =>{
	dispatch(fetchFilteredAlertsBegin());
	fetch(`${process.env.REACT_APP_API_URL}api/segmentevents/getalertsfilter?segment=${segment}&sensorId=${sensorId}&sensortype=${sensortype}&severity=${severity}`)
	.then(handleErrors)
	.then(res => res.json())
	.then(alerts=>{
		dispatch(fetchAlertsSuccess(alerts));
	})
	.catch(error => dispatch(fetchFilteredAlertsFailure(error)))
};
