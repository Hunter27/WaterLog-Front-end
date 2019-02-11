import { FETCH_SEGMENTS_LEAKS } from './Types';
import { Globals } from './../Globals';

export const fetchSegmentsLeaks = () => (dispatch) => {
	fetch(`${Globals.API_URL}/api/segmentleaks`) //Change to use either localhost/server
		.then( res => res.json())
		.then( leaks =>
			dispatch({
				type: FETCH_SEGMENTS_LEAKS,
				payload: leaks
			})
		)
		.catch(function(ex) {
			throw ex;
		});
};
