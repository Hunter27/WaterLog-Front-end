import { FETCH_USAGE_MONTHLY } from '../actions/Types';
import { FETCH_USAGE_MONTHLY_BEGIN,FETCH_USAGE_MONTHLY_SUCCESS,FETCH_USAGE_MONTHLY_FAILURE } from '../actions/Types';

const initialState = {
  item: {
    dataPoints: [
        { x: "0", y: "0"}
    ]
  },
  loading: true
};

export default function (state = initialState, action) {
  switch (action.type) {
  case FETCH_USAGE_MONTHLY_BEGIN:
	return{
		
			...state,
			loading: true,
			error: null
		
	}
    case FETCH_USAGE_MONTHLY_SUCCESS:
      return {
        ...state,
        item: action.payload.monthlyUsage,
        loading:false
      };
    case FETCH_USAGE_MONTHLY_FAILURE:
	       return {
			...state,
			loading: false,
			error: action.payload.error,
			items: {}
		}
    default:
      return state;
  }
}
