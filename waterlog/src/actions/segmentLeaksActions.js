import {FETCH_SEGMENT_LEAKS} from "./types";
 
  export const fetchSegmentLeaks = () => dispatch => { 
    fetch('https://localhost:44382/api/segmentleaks') //TO BE REPLACED WITH THE LIVE API
      .then(res => res.json())
      .then(segment_leaks =>
        dispatch({
          type: FETCH_SEGMENT_LEAKS,
          payload: segment_leaks
        })
      );
  };


