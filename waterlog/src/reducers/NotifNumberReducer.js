import { combineReducers } from 'redux';
import { 
  FETCH_NOTIF,
  FETCH_NOTIF_SUCCESS, 
  FETCH_NOTIF_FAILURE 
  } from '../actions/Types';

const defaultStateList = {
  isFetching: false,
  items: [],
  error: {}
};

const notif = (state = defaultStateList, action) => {
  switch (action.type) {
    case FETCH_NOTIF:
      return { ...state, isFetching: true };
    case FETCH_NOTIF_SUCCESS:
      return { ...state, isFetching: false, items: action.data };
    case FETCH_NOTIF_FAILURE:
      return { ...state, isFetching: false, error: action.data };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  notif
});

export default rootReducer;
