import {
  FECTH_FORECAST_BEGIN,
  FECTH_FORECAST_SUCCESS,
  FECTH_FORECAST_FAILURE
} from '../actions/Types';

const initialState = {
  item: {x:[],y:[]},
  loading: false,
  error: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FECTH_FORECAST_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FECTH_FORECAST_SUCCESS:
      return {
        ...state,
        loading: false,
        item: action.payload.dataset,
        error: null
      };
    case FECTH_FORECAST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        item: {}
      };
    default:
      return state;
  }
}
