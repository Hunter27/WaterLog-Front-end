import { FETCH_LEAK_LITRES } from "./types";

export const fetchLeakLitres = (id = 1) => dispatch => {


  fetch(`https://localhost:44382/api/segmentleaks/litres/${id}`)
    .then(res => res.json())
    .then((leak) => {
      return dispatch({
        type: FETCH_LEAK_LITRES,
        payload: leak
      })
    }
    ).catch(function () {
      console.log("error");
    });
};