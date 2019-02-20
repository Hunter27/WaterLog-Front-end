import {
  FETCH_COSTS_DAILY,
  FETCH_COSTS_MONTHLY,
  FETCH_COSTS_SEASONALLY
} from './Types';
import { Globals } from './../Globals';

export const fetchCostsDaily = () => (dispatch) => {
  fetch(`${Globals.API_URL}/api/segmentevents/dailyCost`) 
    .then(res => res.json())
    .then(dailyCost => {
      dispatch({
        type: FETCH_COSTS_DAILY,
        payload: dailyCost
      });
    });
};
export const fetchCostsMonthly = () => (dispatch) => {
  fetch(`${Globals.API_URL}/api/segmentevents/monthlyCost`)  
    .then(res => res.json())
    .then(monthlyCost => {
      dispatch({
        type: FETCH_COSTS_MONTHLY,
        payload: monthlyCost
      });
    });
};
export const fetchCostsSeasonally = () => (dispatch) => {
  fetch(`${Globals.API_URL}/api/segmentevents/seasonallyCost`) 
    .then(res => res.json())
    .then(seasonalCost => {
      dispatch({
        type: FETCH_COSTS_SEASONALLY,
        payload: seasonalCost
      });
    });
};