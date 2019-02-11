import {
  FETCH_SEGMENTS
} from "./Types";
import { Globals } from './../Globals';

export const fetchSegments = () => dispatch => {
  fetch(`${Globals.API_URL}/api/segments`) //Change to use either localhost/server
    .then(res => res.json())
    .then(segments =>
      dispatch({
        type: FETCH_SEGMENTS,
        payload: segments
      })
    )
    .catch( error => {
      throw error
    })
};