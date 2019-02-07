import { FETCH_SEGMENTS_EVENTS } from "./types";

export const fetchSegmentsEvents = () => dispatch => {
  fetch("https://localhost:44382/api/segmentevents") //Change to use either localhost/server
    .then(res => res.json())
    .then(events =>
      dispatch({
        type: FETCH_SEGMENTS_EVENTS,
        payload: events
      })
    )
    .catch(function() {
      console.log("error");
    });
};
