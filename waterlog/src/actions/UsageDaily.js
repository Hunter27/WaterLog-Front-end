/*import { FETCH_USAGE_DAILY,
   FETCH_USAGE_MONTHLY,
   FETCH_USAGE_SEASONALLY} from './Types';

export const fetchUsageDaily =() => (dispatch) => {
    fetch(process.env.REACT_APP_API_URL+`/api/segmentevents/dailyusage`) //Change to use either localhost/server
      .then(res => res.json())
      .then(dailyUsage => {
        dispatch({
            type: FETCH_USAGE_DAILY,
            payload: dailyUsage
        });
    });
  };

  export const fetchUsageMonthly =() => (dispatch) => {
    fetch(process.env.REACT_APP_API_URL+`/api/segmentevents/monthlyusage`) //Change to use either localhost/server
      .then(res => res.json())
      .then(monthlyUsage=> {
        dispatch({
            type: FETCH_USAGE_MONTHLY,
            payload: monthlyUsage
        });
    });
  };

  export const fetchUsageSeasonally =() => (dispatch) => {
    fetch(process.env.REACT_APP_API_URL+`/api/segmentevents/seasonallyusage`) //Change to use either localhost/server
      .then(res => res.json())
      .then(seasonUsage => {
        dispatch({
            type: FETCH_USAGE_SEASONALLY,
            payload: seasonUsage
        });
    });
  };*/
  import { FETCH_USAGE_DAILY_BEGIN, FETCH_USAGE_DAILY_FAILURE,FETCH_USAGE_DAILY_SUCCESS,handleErrors} from "./Types";
import { Globals } from './../Globals';
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

export const fetchUsageDaily =() => (dispatch) => {
  dispatch(fetchUsageDailyBegin())
  fetch(process.env.REACT_APP_API_URL+`/api/segmentevents/dailyusage`) //Change to use either localhost/server
      .then(handleErrors)
      .then(res => res.json())
      .then(dailyUsage => {
        dispatch(fetchUsageDailySuccess(dailyUsage));
        })
        .catch((error) => {
            dispatch(fetchUsageDailyFailure(error));
        });
}; 
 