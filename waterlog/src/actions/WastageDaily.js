import { FETCH_WASTAGE_DAILY_BEGIN, FETCH_WASTAGE_DAILY_FAILURE,FETCH_WASTAGE_DAILY_SUCCESS,handleErrors} from "./Types";

//import { FETCH_WASTAGE_DAILY, FETCH_WASTAGE_MONTHLY , FETCH_WASTAGE_SEASONALLY, FETCH_WASTAGE_DAILY_BEGIN, FETCH_WASTAGE_DAILY_FAILURE, FETCH_WASTAGE_DAILY_SUCCESS} from "./Types";
import { Globals } from './../Globals';
export const fetchWastageDailyBegin = () => ({
  type: FETCH_WASTAGE_DAILY_BEGIN
});

export const fetchWastageDailySuccess = (dailyWaste) => ({
  type: FETCH_WASTAGE_DAILY_SUCCESS,
  payload: { dailyWaste },
  loading: false
});

export const fetchWastageDailyFailure = (error) => ({
  type: FETCH_WASTAGE_DAILY_FAILURE,
  payload: { error },
  loading: false
});

export const fetchWastageDaily =() => (dispatch) => {
  dispatch(fetchWastageDailyBegin())
    fetch(process.env.REACT_APP_API_URL+'/api/segmentevents/dailywastage') //Change to use either localhost/server
      .then(handleErrors)
      .then(res => res.json())
      .then(dailyWaste => {
        dispatch(fetchWastageDailySuccess(dailyWaste));
        })
        .catch((error) => {
            dispatch(fetchWastageDailyFailure(error));
        });
}; 


  /*export const fetchWastageMonthly =() => (dispatch) => {
    fetch(process.env.REACT_APP_API_URL+'/api/segmentevents/monthlywastage') //Change to use either localhost/server
      .then(res => res.json())
      .then(monthlyWaste => {
        dispatch({
            type: FETCH_WASTAGE_MONTHLY,
            payload: monthlyWaste
        });
    });
  };*/

  /*export const fetchWastageSeasonally =() => (dispatch) => {
    fetch(process.env.REACT_APP_API_URL+'/api/segmentevents/seasonallywastage')
      .then(res => res.json())
      .then(seasonWaste => {
        dispatch({
            type: FETCH_WASTAGE_SEASONALLY,
            payload: seasonWaste
        });
    });
  };*/