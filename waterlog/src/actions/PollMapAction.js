import axios from 'axios';
export const FETCH_NOTIF = 'FETCH_JOKE';
export const FETCH_NOTIF_SUCCESS = 'FETCH_JOKE_SUCCESS';
export const FETCH_NOTIF_FAILURE = 'FETCH_JOKE_FAILURE';


function fetchPollMap() {
  return {
    type: FETCH_NOTIF
  };
}

function fetchPMapSuccess(data) {
  return {
    type: FETCH_NOTIF_SUCCESS,
    data
  };
}

function fetchPMapFail(error) {
  return {
    type: FETCH_NOTIF_FAILURE,
    error
  };
}

export function fetchPollMaps(){
  return function(dispatch){
    dispatch(fetchPollMap());
    return axios.get(process.env.REACT_APP_API_URL+'/api/realtime/pollnotifications', { headers: { 'Accept': 'application/json' }})
    .then(function(result){
      dispatch(fetchPMapSuccess(result))
    })
    .catch(error => dispatch(fetchPMapFail(error)));
  }
}