export const FETCH_SENSORS = 'FETCH_SENSORS';
export const FETCH_SEGMENTS = 'FETCH_SEGMENTS';
//segment leaks actions 
export const FETCH_SEGMENTS_LEAKS_BEGIN = 'FETCH_SEGMENTS_LEAKS_BEGIN';
export const FETCH_SEGMENTS_LEAKS_SUCCESS = 'FETCH_SEGMENTS_LEAKS_SUCCESS';
export const FETCH_SEGMENTS_LEAKS_FAILURE = 'FETCH_SEGMENTS_LEAKS_FAILURE'; 
export const FETCH_COSTS = 'FETCH_COSTS';
//Litres actions
export const FETCH_LEAK_LITRES_BEGIN = 'FETCH_LEAK_LITRES_BEGIN';
export const FETCH_LEAK_LITRES_SUCCESS = 'FETCH_SEGMENTS_LEAKS_SUCCESS';
export const FETCH_LEAK_LITRES_FAILURE = 'FETCH_LEAK_LITRES_FAILURE';
//segment actions
export const FETCH_SEGMENTS_RESOLVED_BEGIN = 'FETCH_SEGMENTS_RESOLVED_BEGIN';
export const FETCH_SEGMENTS_RESOLVED_SUCCESS = 'FETCH_SEGMENTS_RESOLVED_SUCCESS';
export const FETCH_SEGMENTS_RESOLVED_FAILURE = 'FETCH_SEGMENTS_RESOLVED_FAILURE'; 
//Events actions
export const FETCH_SEGMENT_EVENTS_BEGIN = 'FETCH_SEGMENT_EVENTS_BEGIN';
export const FETCH_SEGMENT_EVENTS_SUCCESS = 'FETCH_SEGMENT_EVENTS_SUCCESS';
export const FETCH_SEGMENT_EVENTS_FAILURE = 'FETCH_SEGMENT_EVENTS_FAILURE'; 
//Pump actions
export const FETCH_PUMPS_BEGIN = 'FETCH_PUMPS_BEGIN';
export const FETCH_PUMPS_SUCCESS = 'FETCH_PUMPS_SUCCESS';
export const FETCH_PUMPS_FAILURE = 'FETCH_PUMPS_FAILURE';
//History actions
export const  FETCH_LEAK_HISTORY_BEGIN= ' FETCH_LEAK_HISTORY_BEGIN';
export const FETCH_LEAK_HISTORY_SUCCESS= 'FETCH_LEAK_HISTORY_SUCCESS';
export const FETCH_LEAK_HISTORY_FAILURE = 'FETCH_LEAK_HISTORY_FAILURE';

export const handleErrors = response => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};
