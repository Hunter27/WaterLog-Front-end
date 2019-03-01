import {
	FETCH_SEGMENT_BEGIN,
	FETCH_SEGMENT_SUCCESS,
	FETCH_SEGMENT_FAILURE,
	handleErrors
} from './Types';

export const fetchSegmentBegin = () => ({
	type: FETCH_SEGMENT_BEGIN
});

export const fetchSegmentSuccess = segment => ({
	type: FETCH_SEGMENT_SUCCESS,
	payload: {
		segment
	}
});

export const fetchSegmentFailure = error => ({
	type: FETCH_SEGMENT_FAILURE,
	payload: {
		error
	}
});

export const fetchSegment = (id, date) => dispatch => {
	dispatch(fetchSegmentBegin());
	fetch(`${process.env.REACT_APP_API_URL}/api/segmentleaks/segment/${id}/${date}`)
		.then(handleErrors)
		.then(res => res.json())
		.then(segment => {
			dispatch(fetchSegmentSuccess(segment));
		})
		.catch(error =>dispatch(fetchSegmentFailure(error)));
};
