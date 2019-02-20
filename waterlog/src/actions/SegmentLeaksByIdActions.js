import {
  FETCH_SEGMENTS_LEAKS_BEGIN,
  FETCH_SEGMENTS_LEAKS_SUCCESS,
  FETCH_SEGMENTS_LEAKS_FAILURE
} from './Types';
import { Globals } from './../Globals';

export const fetchSegmentsAllLeaksBegin = () => ({
  type: FETCH_SEGMENTS_LEAKS_BEGIN
});

export const fetchSegmentsAllLeaksSuccess = (leak) => ({
  type: FETCH_SEGMENTS_LEAKS_SUCCESS,
  payload: { leak }
});

export const fetchSegmentsAllLeaksFailure = (error) => ({
  type: FETCH_SEGMENTS_LEAKS_FAILURE,
  payload: { error },

});

//TODO: Resolve promise hell
export const fetchSegmentsLeaksById = id => dispatch => {
  dispatch(fetchSegmentsAllLeaksBegin());
  fetch(process.env.REACT_APP_API_URL+`/api/segmentleaks/${id}`) //Change to use either localhost/server
    .then(res => res.json())
    .then(leak => {
      fetch(process.env.REACT_APP_API_URL+`/api/segmentleaks/costs/${id}`)
        .then(res => res.json())
        .then(data => {
          fetch(process.env.REACT_APP_API_URL+`/api/segmentleaks/litres/${id}`)
            .then(res => res.json())
            .then(usage => {
              dispatch(fetchSegmentsAllLeaksSuccess({ leak, data, usage }));
            });
        });
    })
    .catch((error) => {
      dispatch(fetchSegmentsAllLeaksFailure(error));
    });
}; 
