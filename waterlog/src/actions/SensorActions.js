import FETCH_SENSORS from "./types";

export const fetchSensors = postData => dispatch => {
    fetch('http://api.iot.retrotest.co.za/api/monitors', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(postData)
    })
      .then(res => res.json())
      .then(sensors =>
        dispatch({
          type: FETCH_SENSORS,
          payload: sensors
        })
      );
  };