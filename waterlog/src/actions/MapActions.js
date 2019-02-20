import {
  FETCH_MAP_DATA_BEGIN, 
  FETCH_MAP_DATA_SUCCESS, 
  FETCH_MAP_DATA_FAILURE, 
  handleErrors 
} from './Types';

export const fetchMapsDataBegin = () => ({
	type: FETCH_MAP_DATA_BEGIN
});

export const fetchMapsDataSuccess = (data) => ({
	type: FETCH_MAP_DATA_SUCCESS,
	payload: { data }
});

export const fetchMapsDataFailure = (error) => ({
	type: FETCH_MAP_DATA_FAILURE,
	payload: { error }
});

async function getSegments(){
  const response = await fetch(process.env.REACT_APP_API_URL +`/api/segments`).then(handleErrors);
	const data = await response.json();
	return data;
}

async function getLeakInformation(){
  const response = await fetch(process.env.REACT_APP_API_URL +`/api/segmentleaks`).then(handleErrors);
	const data = await response.json();
	return data;
}

async function getMonitors(){
  const response = await fetch(process.env.REACT_APP_API_URL +`/api/monitors`).then(handleErrors);
	const data = await response.json();
	return data;
}

async function getData(dispatch){
  
  var segments = await getSegments().then(seg => seg).catch(error => {
    dispatch(fetchMapsDataFailure(error));
  });

  var monitors = await getMonitors().then(mon => mon).catch(error => {
    dispatch(fetchMapsDataFailure(error));
  });

  var leaks = await getLeakInformation().then(leak => leak).catch(error => {
    dispatch(fetchMapsDataFailure(error));
  });

  return {segments, monitors, leaks}
}

export const fetchMapsData = () => (dispatch) => {
	dispatch(fetchMapsDataBegin());

  var data = getData(dispatch);
  data.then(res =>{
    dispatch(fetchMapsDataSuccess(res))
  })
  .catch(error => {
    dispatch(fetchMapsDataFailure(error));
  });

};
