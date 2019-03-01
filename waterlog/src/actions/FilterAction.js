import {
	FETCH_FILTERED_ALERTS_BEGIN,
	FETCH_FILTERED_ALERTS_SUCCESS,
	FETCH_FILTERED_ALERTS_FAILURE,
	handleErrors
} from './Types';

export const fetchFilteredAlertsBegin = () => ({
	type: FETCH_FILTERED_ALERTS_BEGIN
});

export const fetchFilteredAlertsSuccess = (filteredAlerts) => ({
	type: FETCH_FILTERED_ALERTS_SUCCESS,
	payload: {
		filteredAlerts
	}
});

export const fetchFilteredAlertsFailure = (error) => ({
	type: FETCH_FILTERED_ALERTS_FAILURE,
	payload: {
		error
	}
});

export const fetchFilteredAlerts = (criteria) => (dispatch) => {
	dispatch(fetchFilteredAlertsBegin());
	fetch(`${process.env.REACT_APP_API_URL}/api/segmentevents/getalertsfilter`, {
		method: 'GET',
		body: JSON.stringify(criteria)
	})
		.then(handleErrors)
		.then((res) => res.json())
		.then((_alerts) => {
			dispatch(fetchFilteredAlertsSuccess(_alerts));
		})
		.catch((error) => {
			dispatch(fetchFilteredAlertsFailure(error));
		});
};
