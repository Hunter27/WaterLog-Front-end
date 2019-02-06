import {FETCH_SEGMENTS} from "./types";
 
  export const fetchSensors = () => dispatch => { 
    fetch('http://api.iot.retrotest.co.za/api/monitors')//Change to use either localhost/server
      .then(res => res.json())
      .then(segments =>
        dispatch({
          type: FETCH_SEGMENTS,
          payload: segments
        })
      );
  };