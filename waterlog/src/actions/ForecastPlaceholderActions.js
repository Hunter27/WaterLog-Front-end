import {
    FETCH_FORECAST_PLACEHOLDER_BEGIN,
    FETCH_FORECAST_PLACEHOLDER_SUCCESS,
    FETCH_FORECAST_PLACEHOLDER_FAILURE,
    handleErrors
} from './Types';

export const fetchPlaceholderBegin = () => ({
    type: FETCH_FORECAST_PLACEHOLDER_BEGIN
});

export const fetchPlaceholderSuccess = placeholder => ({
    type: FETCH_FORECAST_PLACEHOLDER_SUCCESS,
    payload: { placeholder }
});

export const fetchPlaceholderFailure = error => ({
    type: FETCH_FORECAST_PLACEHOLDER_FAILURE,
    payload: { error }
});

export const fetchPlaceholder = () => dispatch => {
    dispatch(fetchPlaceholderBegin()); 
    return fetch(process.env.REACT_APP_API_URL+`/api/costforecast/falsePoints`)
      .then(handleErrors)
      .then(res => res.json())
      .then(placeholder => {
        dispatch(fetchPlaceholderSuccess(placeholder)); 
      })
      .catch(error => {
        dispatch(fetchPlaceholderFailure(error));
      });
  };