import { FETCH_WASTAGE_DAILY, FETCH_WASTAGE_MONTHLY , FETCH_WASTAGE_SEASONALLY} from "./Types";
import { Globals } from './../Globals';

export const fetchWastageDaily =() => (dispatch) => {
    fetch(`${Globals.API_URL}/api/segmentevents/dailywastage`) //Change to use either localhost/server
      .then(res => res.json())
      .then(dailyWaste => {
        dispatch({
            type: FETCH_WASTAGE_DAILY,
            payload: dailyWaste
        });
    });
  };

  export const fetchWastageMonthly =() => (dispatch) => {
    fetch(`${Globals.API_URL}/api/segmentevents/monthlywastage`) //Change to use either localhost/server
      .then(res => res.json())
      .then(monthlyWaste => {
        dispatch({
            type: FETCH_WASTAGE_MONTHLY,
            payload: monthlyWaste
        });
    });
  };

  export const fetchWastageSeasonally =() => (dispatch) => {
    fetch(`${Globals.API_URL}/api/segmentevents/seasonallywastage`) //Change to use either localhost/server
      .then(res => res.json())
      .then(seasonWaste => {
        dispatch({
            type: FETCH_WASTAGE_SEASONALLY,
            payload: seasonWaste
        });
    });
  };