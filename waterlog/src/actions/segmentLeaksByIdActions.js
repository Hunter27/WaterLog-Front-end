import { FETCH_SEGMENTS_LEAK } from './types';

export const fetchSegmentsLeaksById = (id) => (dispatch) => {
	fetch(`https://localhost:44382/api/segmentleaks/${id}`) //Change to use either localhost/server
		.then((res) => res.json())
		.then((leak) => {
      fetch(`https://localhost:44382/api/segmentleaks/costs/${id}`)
      .then((res) => res.json())
      .then((data) => {
				fetch(`https://localhost:44382/api/segmentleaks/litres/${id}`)
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
