import { FETCH_LEAKS_COSTS } from "./types";

export const fetchLeaksCosts = () => dispatch => {
  var id =1;

  fetch(`https://localhost:44382/api/segmentleaks/costs/${id}`) 
    .then(res => res.json())
    .then((costs) =>{
     return dispatch({
        type: FETCH_LEAKS_COSTS,
        payload: costs
      })
    }
    ).catch(function() {
      console.log("error");
  });
};
