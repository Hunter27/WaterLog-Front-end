import {
  FETCH_HEAT_MAP_DATA_BEGIN,
  FETCH_HEAT_MAP_DATA_SUCCESS,
  FETCH_HEAT_MAP_DATA_FAILURE,
  handleErrors
} from './Types';

export const fetchHeatMapsDataBegin = () => ({
  type: FETCH_HEAT_MAP_DATA_BEGIN
});

export const fetchHeatMapsDataSuccess = (data) => ({
  type: FETCH_HEAT_MAP_DATA_SUCCESS,
  payload: { data }
});

export const fetchHeatMapsDataFailure = (error) => ({
  type: FETCH_HEAT_MAP_DATA_FAILURE,
  payload: { error }
});

async function getMonitors() {
  const response = await fetch(process.env.REACT_APP_API_URL + `/api/monitors/heat`).then(handleErrors);
  const data = await response.json();
  return data;
}

async function getSegments(){
  const response = await fetch(process.env.REACT_APP_API_URL + `/api/segments`).then(handleErrors);
  const data = await response.json();
  return data;
}

async function generateSegmentsCoordinates(monitors,dispatch){
  let segments = await getSegments()
    .then(seg => seg)
    .catch(error => {
      dispatch(fetchHeatMapsDataFailure(error));
    });
    const data = segments.map(seg => {
      const sensor1 = monitors.find(sensor => (sensor.id === seg.senseIDIn));
      const sensor2 = monitors.find(sensor => (sensor.id === seg.senseIDOut));
      if(sensor1 && sensor2){
        const toAdd = (s1,s2) => s1 > s2? s2:s1;
        const newCoordinatesLongitude = Math.abs( sensor1.long - sensor2.long )/2 + toAdd(sensor1.long,sensor2.long);
        const newCoordinatesLatitude = Math.abs( sensor1.lat - sensor2.lat )/2 + toAdd(sensor2.lat,sensor1.lat);

        console.log(newCoordinatesLatitude,newCoordinatesLongitude, [sensor1.lat,sensor2.lat], [sensor1.long,sensor2.long])
        let heatIntensity = 'Clear';
        if(seg.faultCount >= 5){
          heatIntensity = 'High';
        } else if (seg.faultCount >= 3){
          heatIntensity = 'Medium';
        } else if (seg.faultCount >= 1){
          heatIntensity = 'Low';
        }
        return {"long":newCoordinatesLongitude,"lat":newCoordinatesLatitude,"faultLevel":heatIntensity};
      }
      return;
    });
    return data;
}

async function getData(dispatch) {

  const monitorsCoordinates = await getMonitors()
    .then(mon => mon)
    .catch(error => {
      dispatch(fetchHeatMapsDataFailure(error));
    });
  
  const segmentCoordinates = await generateSegmentsCoordinates(monitorsCoordinates,dispatch);

  return {monitorsCoordinates, segmentCoordinates}
}

export const fetchHeatMapsData = () => (dispatch) => {
  dispatch(fetchHeatMapsDataBegin());

  var data = getData(dispatch);
  data
    .then(res => {
      dispatch(fetchHeatMapsDataSuccess(res));
    })
    .catch(error => {
      dispatch(fetchHeatMapsDataFailure(error));
    });
};
