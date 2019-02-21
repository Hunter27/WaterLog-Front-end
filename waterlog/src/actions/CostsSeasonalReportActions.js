import {
    FETCH_COSTS_SEASONALLY_BEGIN,
    FETCH_COSTS_SEASONALLY_SUCCESS,
    FETCH_COSTS_SEASONALLY_FAILURE,
    handleErrors
} from './Types';

export const fetchCostsSeasonalBegin = () => ({
    type: FETCH_COSTS_SEASONALLY_BEGIN
});

export const fetchCostsSeasonalSuccess = seasonalCost => ({
    type: FETCH_COSTS_SEASONALLY_SUCCESS,
    payload: {
        seasonalCost
    }
});

export const fetchCostsSeasonalFailure = error => ({
    type: FETCH_COSTS_SEASONALLY_FAILURE,
    payload: {
        error
    }
});

export const fetchCostsSeasonally = () => (dispatch) => {
    dispatch(fetchCostsSeasonalBegin());
    fetch(process.env.REACT_APP_API_URL + `/api/segmentevents/seasonallyCost`)
    .then(handleErrors)
        .then(res => res.json())
        .then(seasonalCost => {
            dispatch(fetchCostsSeasonalSuccess(seasonalCost));
        })
        .catch(error => dispatch(fetchCostsSeasonalFailure(error)));
};
