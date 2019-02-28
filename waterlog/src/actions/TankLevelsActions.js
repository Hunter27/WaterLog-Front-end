import {
	FETCH_TANK_LEVELS_BEGIN,
	FETCH_TANK_LEVELS_SUCCESS,
	FETCH_TANK_LEVELS_FAILURE,
	handleErrors
} from './Types';

export const fetchTankLevelsBegin = () => ({
	type: FETCH_TANK_LEVELS_BEGIN
});

export const fetchTankLevelsSuccess = levels => ({
	type: FETCH_TANK_LEVELS_SUCCESS,
	payload: {
		levels
	}
});

export const fetchTankLevelsFailure = error => ({
	type: FETCH_TANK_LEVELS_FAILURE,
	payload: {
		error
	}
});

export const fetchTankLevels = () => dispatch => {
	dispatch(fetchTankLevelsBegin());
	fetch(process.env.REACT_APP_API_URL+`/api/tankreadings/tankobject`)
		.then(handleErrors)
		.then(res => res.json())
		.then(levels => {
			dispatch(fetchTankLevelsSuccess(levels));
		})
		.catch(error => dispatch(fetchTankLevelsFailure(error)));
};
