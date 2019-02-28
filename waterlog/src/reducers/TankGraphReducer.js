import {
  FETCH_TANK_GRAPH_BEGIN,
	FETCH_TANK_GRAPH_SUCCESS,
	FETCH_TANK_GRAPH_FAILURE
} from '../actions/Types';

const initialState = {
  item: {
    dataPoints: [
      { x: "0", y: "0" }
    ]
  },
  loading: false,
	error: null
};

export default function(state = initialState, action) {
	switch (action.type) {
		case FETCH_TANK_GRAPH_BEGIN:
			return {
				...state,
				loading: true,
				error: null
			};
		case FETCH_TANK_GRAPH_SUCCESS:
			return {
				...state,
				loading: false,
				item: action.payload.dailytankgraph,
				error: null
			};
		case 	FETCH_TANK_GRAPH_FAILURE:
			return {
				...state,
				loading: false,
				items: {},
				error: action.payload.error
			};
		default:
			return state;
	}
}