import { FETCH_SEGMENTS_LEAK } from './types';

export const fetchSegmentsLeaksById = (id) => (dispatch) => {
	fetch(`https://api.iot.retrotest.co.za/api/segmentleaks/${id}`) //Change to use either localhost/server
		.then((res) => res.json())
		.then((leak) => {
      fetch(`https://api.iot.retrotest.co.za/api/segmentleaks/costs/${id}`)
      .then((res) => res.json())
      .then((data) => {
				fetch(`https://api.iot.retrotest.co.za/api/segmentleaks/litres/${id}`)
					.then((res) => res.json())
					.then((usage) => {
						dispatch({
							type: FETCH_SEGMENTS_LEAK,
							payload: { leak, data, usage }
						});
					});
			});
		});
};
