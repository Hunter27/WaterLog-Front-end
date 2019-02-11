 export const FETCH_SENSORS = 'FETCH_SENSORS';
 export const FETCH_SEGMENTS = 'FETCH_SEGMENTS';
 export const FETCH_SEGMENTS_EVENTS = 'FETCH_SEGMENTS_EVENTS';
 export const FETCH_SEGMENTS_LEAKS_BEGIN = 'FETCH_SEGMENTS_LEAKS_BEGIN';
 export const FETCH_SEGMENTS_LEAKS_SUCCESS = 'FETCH_SEGMENTS_LEAKS_SUCCESS';
 export const FETCH_SEGMENTS_LEAKS_FAILURE = 'FETCH_SEGMENTS_LEAKS_FAILURE';
 export const FETCH_SEGMENTS_LEAK = 'FETCH_SEGMENTS_LEAK';
 export const FETCH_COSTS = 'FETCH_COSTS';


 export const handleErrors = (response) => {
    if(!response.ok){
        throw Error(response.statusText);
    }
    return response;
 }
 