import {
	FETCH_LEAK_HISTORY_BEGIN,
    FETCH_LEAK_HISTORY_SUCCESS,
    FETCH_LEAK_HISTORY_FAILURE,
	handleErrors
} from './Types';
import { Globals } from './../Globals';

export const fecthSegmentsLeaksHistoryBegin = () => ({
	type: FETCH_LEAK_HISTORY_BEGIN
});

export const fecthSegmentsLeaksHistorySuccess = (leaks) => ({
	type: FETCH_LEAK_HISTORY_SUCCESS,
	payload: { leaks }
});

export const fecthSegmentsLeaksHistoryFailure = (error) => ({
	type: FETCH_LEAK_HISTORY_FAILURE,
	payload: { error },
	
});

//TODO: Resolve promise hell
export const fetchSegmentsLeaksHistory = () => (dispatch) => {
	dispatch(fecthSegmentsLeaksHistoryBegin());
	return fetch(process.env.REACT_APP_API_URL+`/api/segmentleaks/segment/${2}`) 
		.then((res) => handleErrors(res))
		.then((res) => res.json())
		.then((leaks) => {
			var count = 0;
			leaks.map((leak) =>
				fetch(process.env.REACT_APP_API_URL+`/api/segmentleaks/costs/${leak.id}`) 
					.then((res) => res.json())
					.then((cost) => {
						leaks[count].cost = cost;
						count = count + 1;
						if (count === leaks.length) {
							dispatch(fecthSegmentsLeaksHistorySuccess(leaks));
						}
					})
			);
			return leaks;
		})
		.catch((error) => {
			dispatch(fecthSegmentsLeaksHistoryFailure(error));
		});
};
