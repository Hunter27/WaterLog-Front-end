import {
  FETCH_COSTS
} from "./Types";
import { Globals } from './../Globals';

export const fetchCosts = () => dispatch => {
  fetch(`${Globals.API_URL}/api/segments`) //Change to use either localhost/server
    .then(res => res.json())
    .then(costs =>
      dispatch({
        type: FETCH_COSTS,
        payload: costs
      })
    );
};