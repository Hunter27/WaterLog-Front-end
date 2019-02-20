import { FETCH_USAGE_DAILY,
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
  };