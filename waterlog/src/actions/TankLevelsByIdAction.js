import {
	FETCH_TANK_LEVEL_BEGIN,
	FETCH_TANK_LEVEL_FAILURE,
	FETCH_TANK_LEVEL_SUCCESS
} from './Types';

export const fecthTankLevelBegin = () => ({
	type: FETCH_TANK_LEVEL_BEGIN
});

export const fecthTankLevelSuccess = (level) => ({
	type: FETCH_TANK_LEVEL_SUCCESS,
	payload: { level }
});

export const fecthTankLevelFailure = (error) => ({
	type: FETCH_TANK_LEVEL_FAILURE,
	payload: { error },

});

export const fetchTankLevelById = (id) => dispatch => {
	dispatch(fecthTankLevelBegin());
	return fetch(process.env.REACT_APP_API_URL + `/api/Tankreadings/tankobject/${id}`)
		.then(res => res.json())
		.then(level => {
			dispatch(
				fecthTankLevelSuccess(level)
			)
			return level;
		})
		.catch(error => dispatch(
			fecthTankLevelFailure(error)
		))

}
