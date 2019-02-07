import { FETCH_COSTS } from "./types";

export const fetchCosts = () => dispatch => {
  fetch('https://localhost:44382/api/segments')//Change to use either localhost/server
    .then(res => res.json())
    .then(costs =>
      dispatch({
        type: FETCH_COSTS,
        payload: costs
      })
    );
};