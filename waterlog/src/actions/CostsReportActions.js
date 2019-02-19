import { FETCH_COSTS_DAILY} from './Types';
import { Globals } from './../Globals';

export const fetchCostsDaily =() => (dispatch) => {
    fetch(`${Globals.API_URL}/api/segmentevents/dailyCost`) //Change to use either localhost/server
      .then(res => res.json())
      .then(dailyCost => {
        dispatch({
            type: FETCH_COSTS_DAILY,
            payload: dailyCost
        });
    });
  };
