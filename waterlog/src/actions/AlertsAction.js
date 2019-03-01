import {
	FETCH_ALERTS_BEGIN,
	FETCH_ALERTS_SUCCESS,
	FETCH_ALERTS_FAILURE,
	handleErrors
} from './Types';

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
