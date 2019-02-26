import {
  FETCH_SENSORS_BEGIN,
  FETCH_SENSORS_SUCCESS,
  FETCH_SENSORS_FAILURE
} from '../actions/Types';

const initialState = {
  items: [],
  item: {},
  loading: true,
  error: null
}

export default function (state = initialState, action) {
  switch (action.type) {
      case FETCH_SENSORS_BEGIN:
          return {
              ...state,
              loading: true,
              error: null
          }
      case FETCH_SENSORS_SUCCESS:
          return {
              ...state,
              loading: false,
              items: action.payload.sensors,
              error: null
          }
      case FETCH_SENSORS_FAILURE:
          return {
              ...state,
              loading: false,
              error: action.payload.error,
              items: []
          }
      default:
          return state;
  }
}