import {
    FETCH_FORECAST_PLACEHOLDER_BEGIN,
    FETCH_FORECAST_PLACEHOLDER_SUCCESS,
    FETCH_FORECAST_PLACEHOLDER_FAILURE,
  } from '../actions/Types';
  
  const initialState = {
    item:[],
    loading: false,
    error: null
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case FETCH_FORECAST_PLACEHOLDER_BEGIN:
        return {
          ...state,
          loading: true,
          error: null
        };
      case FETCH_FORECAST_PLACEHOLDER_SUCCESS:
        return {
          ...state,
          loading: false,
          item: action.payload.placeholder,
          error: null
        };
      case FETCH_FORECAST_PLACEHOLDER_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload.error,
          item: []
        };
      default:
        return state;
    }
  }
  