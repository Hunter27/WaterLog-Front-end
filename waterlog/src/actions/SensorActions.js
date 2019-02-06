import { FETCH_SENSORS } from "./types";

export const fetchSensors = () => dispatch => {
  fetch('https://localhost:44382/api/monitors')
    .then(res => res.json())
    .then(sensors =>
      dispatch({
        type: FETCH_SENSORS,
        payload: sensors
      })
    );
};


