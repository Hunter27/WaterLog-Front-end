import { FETCH_SEGMENTS_LEAKS } from "./types";

export const fetchSegmentsLeaks = () => dispatch => {
  
  fetch('https://localhost:44382/api/segmentleaks')//Change to use either localhost/server
  .then(res => res.json())
  .then(leaks => {
    return dispatch({
      type: FETCH_SEGMENTS_LEAKS,
      payload: leaks
    });
  })
  .catch(function () {
    console.log("error");
  });
};