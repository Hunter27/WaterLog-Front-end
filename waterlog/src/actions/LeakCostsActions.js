import { FETCH_LEAKS_COSTS } from "./types";

export const fetchLeaksCosts = (id = 1) => dispatch => {
  fetch(`https://localhost:44382/api/segmentleaks/costs/${id}`)
    .then(res => res.json())
    .then(costs => {
      return dispatch({
        type: FETCH_LEAKS_COSTS,
        payload: costs
      });
    })
    .catch(function() {
      console.log("error");
    });
};
