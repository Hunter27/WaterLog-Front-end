import {
	FETCH_SEGMENTS_LEAKS_BEGIN,
	FETCH_SEGMENTS_LEAKS_SUCCESS,
	FETCH_SEGMENTS_LEAKS_FAILURE,
	handleErrors
} from './Types';
import { Globals } from './../Globals';

export const fecthSegmentsResolvesBegin = () => ({
	type: FETCH_SEGMENTS_LEAKS_BEGIN
});

export const fecthSegmentsResolvesSuccess = (leaks) => ({
	type: FETCH_SEGMENTS_LEAKS_SUCCESS,
	payload: { leaks }
});

export const fecthSegmentsResolvesFailure = (error) => ({
	type: FETCH_SEGMENTS_LEAKS_FAILURE,
	payload: { error },

});

//TODO: Resolve promise hell
export const fetchSegmentsLeaks = () => (dispatch) => {
	dispatch(fecthSegmentsResolvesBegin());
	return fetch(`${Globals.API_URL}/api/segmentleaks`)
		.then(handleErrors)
		.then((res) => res.json())
		.then((leaks) => {
			var count = 0;
			leaks.map((leak) =>
				fetch(`${Globals.API_URL}/api/segmentleaks/costs/${leak.id}`) //is it segmentId or Id?
					.then((res) => res.json())
					.then((cost) => {
						leaks[count].cost = cost;
						count = count + 1;
						if (count === leaks.length) {
							dispatch(fecthSegmentsResolvesSuccess(leaks));
						}
					})
			);
			return leaks;
		})
		.catch((error) => {
			dispatch(fecthSegmentsResolvesFailure(error));
		});
};
