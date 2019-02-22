import {
  FETCH_USAGE_DAILY_BEGIN,
  FETCH_USAGE_DAILY_FAILURE,
  FETCH_USAGE_DAILY_SUCCESS,
  handleErrors
} from "./Types";

export const fetchUsageDailyBegin = () => ({
  type: FETCH_USAGE_DAILY_BEGIN
});

export const fetchUsageDailySuccess = (dailyUsage) => ({
  type: FETCH_USAGE_DAILY_SUCCESS,
  payload: { dailyUsage },
  loading: false
});

export const fetchUsageDailyFailure = (error) => ({
  type: FETCH_USAGE_DAILY_FAILURE,
  payload: { error },
  loading: false
});

export const fetchUsageDaily = () => (dispatch) => {
  dispatch(fetchUsageDailyBegin())
  fetch(process.env.REACT_APP_API_URL + `/api/segmentevents/dailyusage`) 
    .then(handleErrors)
    .then(res => res.json())
    .then(dailyUsage => {
      dispatch(fetchUsageDailySuccess(dailyUsage));
    })
    .catch((error) => {
      dispatch(fetchUsageDailyFailure(error));
    });
};
