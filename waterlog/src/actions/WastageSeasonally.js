import { FETCH_WASTAGE_SEASONALLY_BEGIN, FETCH_WASTAGE_SEASONALLY_FAILURE,FETCH_WASTAGE_SEASONALLY_SUCCESS,handleErrors} from "./Types";

//import { FETCH_WASTAGE_DAILY, FETCH_WASTAGE_MONTHLY , FETCH_WASTAGE_SEASONALLY, FETCH_WASTAGE_DAILY_BEGIN, FETCH_WASTAGE_DAILY_FAILURE, FETCH_WASTAGE_DAILY_SUCCESS} from "./Types";
import { Globals } from './../Globals';
export const fetchhWastageSeasonallyBegin = () => ({
  type: FETCH_WASTAGE_SEASONALLY_BEGIN
});

export const fetchWastageSeasonallySuccess = (seasonWaste) => ({
  type: FETCH_WASTAGE_SEASONALLY_SUCCESS,
  payload: {seasonWaste },
  loading:false
});

export const fetchWastageSeasonallyFailure = (error) => ({
  type: FETCH_WASTAGE_SEASONALLY_FAILURE,
  payload: { error },
  loading: false
});

export const fetchWastageSeasonally =() => (dispatch) => {
  dispatch(fetchhWastageSeasonallyBegin())
  fetch(process.env.REACT_APP_API_URL+'/api/segmentevents/seasonallywastage')
      .then(handleErrors)
      .then(res => res.json())
      .then(seasonWaste => {
        dispatch(fetchWastageSeasonallySuccess(seasonWaste));
        })
        .catch((error) => {
            dispatch(fetchWastageSeasonallyFailure(error));
        });
}; 