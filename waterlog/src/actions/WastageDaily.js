import { FETCH_WASTAGE_DAILY_BEGIN,
   FETCH_WASTAGE_DAILY_FAILURE,
   FETCH_WASTAGE_DAILY_SUCCESS,
   handleErrors} from "./Types";
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
    fetch(process.env.REACT_APP_API_URL+'/api/segmentevents/dailywastage') 
      .then(handleErrors)
      .then(res => res.json())
      .then(dailyWaste => {
        dispatch(fetchWastageDailySuccess(dailyWaste));
        })
        .catch((error) => {
            dispatch(fetchWastageDailyFailure(error));
        });
}; 
 