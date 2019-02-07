import { FETCH_LEAKS_COSTS } from "./types";

export const fetchLeaksCosts = () => dispatch => { 
  fetch('https://localhost:44382/api/segmentleaks/costs/1')//Change to use either localhost/server
    .then(res => res.json())
    .then(costs =>
      dispatch({
        type: FETCH_LEAKS_COSTS,
        payload: costs
      })
    );
};
