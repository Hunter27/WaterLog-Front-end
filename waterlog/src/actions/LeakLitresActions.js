import {
  FETCH_LEAK_LITRES_BEGIN,
  FETCH_LEAK_LITRES_SUCCESS,
  FETCH_LEAK_LITRES_FAILURE,
  handleErrors
} from './Types';
import { Globals } from './../Globals';

export const fetchLeakLitresBegin = () => ({
  type: FETCH_LEAK_LITRES_BEGIN
});

export const fetchLeakLitresSuccess = litres => ({
  type: FETCH_LEAK_LITRES_SUCCESS,
  payload: { litres }
});

export const fetchLeakLitresFailure = error => ({
  type: FETCH_LEAK_LITRES_FAILURE,
  payload: { error }
});

export const fetchLeakLitres = id => dispatch => {
  dispatch(fetchLeakLitresBegin());
  fetch(`${Globals.API_URL}/api/segmentleaks/litres${id}`)
    .then(handleErrors)
    .then(res => res.json())
    .then(leak => {
      dispatch(fetchLeakLitresSuccess(leak));
    })
    .catch(error => dispatch(fetchLeakLitresFailure(error)));
};
