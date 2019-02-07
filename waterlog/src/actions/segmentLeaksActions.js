import { FETCH_SEGMENTS_LEAKS } from "./types";

export const fetchSegmentsLeaks = () => dispatch => {
  console.log("please");
  fetch('https://api.iot.retrotest.co.za/api/segmentleaks')//Change to use either localhost/server
    .then(res => res.json())
    .then(leaks =>
      dispatch({
        type: FETCH_SEGMENTS_LEAKS,
        payload: leaks
      })
    );
};

