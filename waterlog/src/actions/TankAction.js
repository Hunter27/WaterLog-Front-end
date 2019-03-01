import {
	FETCH_TANK_BEGIN,
	FETCH_TANK_SUCCESS,
	FETCH_TANK_FAILURE,
	handleErrors
} from './Types';

export const fetchTankBegin = () => ({
	type: FETCH_TANK_BEGIN
});

export const fetchTankSuccess = tank => ({
	type: FETCH_TANK_SUCCESS,
	payload: {
		tank
	}
});

export const fetchTankFailure = error => ({
	type: FETCH_TANK_FAILURE,
	payload: {
		error
	}
});

export const fetchTank = (id, date) => dispatch => {
	dispatch(fetchTankBegin());
	fetch(`${process.env.REACT_APP_API_URL}/api/tankreadings/tank/${id}/${date}`)
		.then(handleErrors)
		.then(res => res.json())
		.then(sensor => {
			dispatch(fetchTankSuccess(sensor));
		})
		.catch(error => dispatch(fetchTankFailure(error)));
};
