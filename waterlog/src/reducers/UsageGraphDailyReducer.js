import { FETCH_USAGE_DAILY_BEGIN,FETCH_USAGE_DAILY_SUCCESS,FETCH_USAGE_DAILY_FAILURE } from '../actions/Types';
import { FETCH_USAGE_DAILY } from '../actions/Types';

const initialState = {
  item: {
    dataPoints: [
        { x: "0", y: "0"}
    ]
  },
  loading: true,
  error: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_USAGE_DAILY_BEGIN:
		return {
			...state,
			loading: true,
			error: null
		}
    case FETCH_USAGE_DAILY_SUCCESS:
      return {
        ...state,
        item: action.payload.dailyUsage,
        loading:false
      };
      case FETCH_USAGE_DAILY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                item: {}
            }
    default:
      return state;
  }
}
