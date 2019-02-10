import {
  FETCH_SENSORS
} from "./Types";
import { Globals } from './../Globals';

export const fetchSensors = () => dispatch => {
  fetch(`${Globals.API_URL}/api/monitors`)
    .then(res => res.json())
    .then(sensors =>
      dispatch({
        type: FETCH_SENSORS,
        payload: sensors
      })
    );
};