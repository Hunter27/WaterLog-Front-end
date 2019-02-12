import { FETCH_SEGMENTS_LEAK } from './Types';
import { Globals } from './../Globals';

export const fetchSegmentsLeaksById = id => dispatch => {
  fetch(`${Globals.API_URL}/api/segmentleaks/${id}`) //Change to use either localhost/server
    .then(res => res.json())
    .then(leak => {
      fetch(`${Globals.API_URL}/api/segmentleaks/costs/${id}`)
        .then(res => res.json())
        .then(data => {
          fetch(`${Globals.API_URL}/api/segmentleaks/litres/${id}`)
            .then(res => res.json())
            .then(usage => {
              dispatch({
                type: FETCH_SEGMENTS_LEAK,
                payload: {
                  leak,
                  data,
                  usage
                }
              });
            });
        });
    });
};
