import {
  FETCH_SENSORS_BEGIN,
  FETCH_SENSORS_FAILURE,
  FETCH_SENSORS_SUCCESS
} from './Types';

export const fecthSensorsBegin = () => ({
  type: FETCH_SENSORS_BEGIN
});

export const fecthSensorsSuccess = (sensor) => ({
  type: FETCH_SENSORS_SUCCESS,
  payload: { sensor }
});

export const fecthSensorFailure = (error) => ({
  type: FETCH_SENSORS_FAILURE,
  payload: { error },

});

export const fetchSensorsById = (id) => dispatch => {
  dispatch(fecthSensorsBegin());
  return fetch(process.env.REACT_APP_API_URL+`/api/monitors/${id}`)
      .then(res => res.json())
      .then(sensor => {
          dispatch(
              fecthSensorsSuccess(sensor)
          )
          return sensor;
      })
      .catch(error => dispatch(
          fecthSensorsFailure(error)
      ))
}
