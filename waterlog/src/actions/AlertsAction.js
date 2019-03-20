import {
  FETCH_ALERTS_BEGIN,
  FETCH_ALERTS_SUCCESS,
  FETCH_ALERTS_FAILURE,
  FETCH_FILTERED_ALERTS_BEGIN,
  FETCH_FILTERED_ALERTS_SUCCESS,
  FETCH_FILTERED_ALERTS_FAILURE,
  GET_PAGE_NUMBER,
  handleErrors
} from './Types';

export const fetchFilteredAlertsBegin = () => ({
  type: FETCH_FILTERED_ALERTS_BEGIN
});

export const fetchFilteredAlertsSuccess = alerts => ({
  type: FETCH_FILTERED_ALERTS_SUCCESS,
  payload: { alerts }
});

export const fetchFilteredAlertsFailure = error => ({
  type: FETCH_FILTERED_ALERTS_FAILURE,
  payload: {
    error: error.message
  }
})

export const fetchAlertsBegin = (load) => ({
  type: FETCH_ALERTS_BEGIN,
  load: load
});

export const fetchAlertsSuccess = (alerts, id) => ({
  type: FETCH_ALERTS_SUCCESS,
  payload: {
    alerts,
    total: alerts.length,
    page: id
  }
});

export const fetchAlertsFailure = error => ({
  type: FETCH_ALERTS_FAILURE,
  payload: {
    error
  }
});

export const fetPageNumber = () => ({
  type: GET_PAGE_NUMBER
});

export const fetchAlerts = (id, loadMore) => dispatch => {
  dispatch(fetchAlertsBegin(loadMore));
  fetch(`${process.env.REACT_APP_API_URL}/api/segmentevents/getalerts/` + id)
    .then(handleErrors)
    .then(res => res.json())
    .then(alerts => {
      dispatch(fetchAlertsSuccess(alerts, id));
    })
    .catch(error => dispatch(fetchAlertsFailure(error)));
};
