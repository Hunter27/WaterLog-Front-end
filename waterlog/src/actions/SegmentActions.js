import {
  FETCH_SEGMENTS
} from "./Types";

export const fetchSegments = () => dispatch => {
  console.log("please");
  fetch('https://api.iot.retrotest.co.za/api/segments') //Change to use either localhost/server
    .then(res => res.json())
    .then(segments =>
      dispatch({
        type: FETCH_SEGMENTS,
        payload: segments
      })
    );
};