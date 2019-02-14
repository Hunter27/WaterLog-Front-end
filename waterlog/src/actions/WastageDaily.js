import { FETCH_WASTAGE_DAILY, FETCH_WASTAGE_MONTHLY , FETCH_WASTAGE_SEASONALLY,FETCH_WASTAGE_DAILY_BEGIN,FETCH_WASTAGE_DAILY_SUCCESS,FETCH_WASTAGE_DAILY_FAILURE} from "./Types";
import { Globals } from './../Globals';

export const fecthWastageDailyBegin = () => ({
	type: FETCH_WASTAGE_DAILY_BEGIN
});

export const fecthWastageDailySuccess = (dailywaste) => ({
	type: FETCH_WASTAGE_DAILY_SUCCESS,
	payload: { dailywaste }
});

export const fecthWastageDailyFailure = (error) => ({
	type: FETCH_WASTAGE_DAILY_FAILURE,
	payload: { error }
});

export const fetchWastageDaily =() => (dispatch) => {
    fetch(`${Globals.API_URL}/api/segmentevents/dailywastage`) //Change to use either localhost/server
      .then(res => res.json())
      .then(dailywaste => {
        dispatch({
            type: FETCH_WASTAGE_DAILY,
            payload: dailywaste
        });
    });
  };

  export const fetchWastageMonthly =() => (dispatch) => {
    fetch(`${Globals.API_URL}/api/segmentevents/monthlywastage`) //Change to use either localhost/server
      .then(res => res.json())
      .then(monthlywaste => {
        dispatch({
            type: FETCH_WASTAGE_MONTHLY,
            payload: monthlywaste
        });
    });
  };

  export const fetchWastageSeasonally =() => (dispatch) => {
    fetch(`${Globals.API_URL}/api/segmentevents/seasonallywastage`) //Change to use either localhost/server
      .then(res => res.json())
      .then(seasonwaste => {
        dispatch({
            type: FETCH_WASTAGE_SEASONALLY,
            payload: seasonwaste
        });
    });
  };