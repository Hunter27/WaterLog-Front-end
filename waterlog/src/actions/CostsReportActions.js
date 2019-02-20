import {
  FETCH_COSTS_DAILY_BEGIN,
  FETCH_COSTS_DAILY_SUCCESS,
  FETCH_COSTS_DAILY_FAILURE,
  handleErrors 
} from './Types'; 

export const fetchCostsDailyBegin = () => ({
	type: FETCH_COSTS_DAILY_BEGIN
});

export const fetchCostsDailySuccess = dailyCost => ({
	type: FETCH_COSTS_DAILY_SUCCESS,
	payload: {
		dailyCost
	}
});

export const fetchCostsDailyFailure = error => ({
	type: FETCH_COSTS_DAILY_FAILURE,
	payload: {
		error
	}
});

export const fetchCostsDaily = () => (dispatch) => {
  dispatch(fetchCostsDailyBegin());
  fetch(process.env.REACT_APP_API_URL+`/api/segmentevents/dailyCost`) 
  .then(handleErrors)
    .then(res => res.json())
    .then(dailyCost => {
      dispatch(fetchCostsDailySuccess(dailyCost));
    })
      .catch(error => dispatch(fetchCostsDailyFailure(error)));
};  
