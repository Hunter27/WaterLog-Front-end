import {
  FETCH_MAP_DATA_BEGIN,
  FETCH_MAP_DATA_SUCCESS,
  FETCH_MAP_DATA_FAILURE,
  FETCH_PMAP_DATA_BEGIN,
  FETCH_PMAP_DATA_SUCCESS,
  FETCH_PMAP_DATA_FAILURE,
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

export const fetchPMapsDataBegin = () => ({
  type: FETCH_PMAP_DATA_BEGIN
});

export const fetchPMapsDataSuccess = (data) => ({
  type: FETCH_PMAP_DATA_SUCCESS,
  payload: { data }
});

export const fetchPMapsDataFailure = (error) => ({
  type: FETCH_PMAP_DATA_FAILURE,
  payload: { error }
});

async function getSegments() {
  const response = await fetch(process.env.REACT_APP_API_URL + `/api/segments`).then(handleErrors);
  const data = await response.json();
  return data;
}

async function getLeakInformation() {
  const response = await fetch(process.env.REACT_APP_API_URL + `/api/segmentleaks`).then(handleErrors);
  const data = await response.json();
  return data.filter(a => a.resolvedStatus === 2);
}

async function getMonitors() {
  const response = await fetch(process.env.REACT_APP_API_URL + `/api/monitors`).then(handleErrors);
  const data = await response.json();
  return data;
}

async function getData(dispatch) {

  var segments = await getSegments().then(seg => seg).catch(error => {
    dispatch(fetchMapsDataFailure(error));
  });

  var monitors = await getMonitors()
    .then(mon => mon)
    .catch(error => {
      dispatch(fetchMapsDataFailure(error));
    });

  var leaks = await getLeakInformation()
    .then(leak => leak)
    .catch(error => {
      dispatch(fetchMapsDataFailure(error));
    });

  return { segments, monitors, leaks }
}

function formatMapData(data) {
  let markers, segments;
  let todaysLeaks;
  let date = new Date(Date.now());
  if (!data.leaks) {
    todaysLeaks = [];
  } else {
    todaysLeaks = data.leaks.filter(
      leak => {
        let latestTimeStamp = new Date(leak.latestTimeStamp);

        if (latestTimeStamp.getDay() === date.getDay() &&
          latestTimeStamp.getMonth() === date.getMonth() &&
          latestTimeStamp.getFullYear() === date.getFullYear()) {
          return leak;
        }
        else
          return [];
      });
  }

  if (data.segments) {
    segments = data.segments.map(seg => {
      if (
        JSON.stringify(Object.keys(seg)) !==
        JSON.stringify(["id", "senseIDOut", "senseIDIn", "faultCount"])
      ) { return []; }
      const leak = todaysLeaks.find(leak => leak.segmentsId === seg.id);
      if (leak) {
        if (leak.resolvedStatus) { seg.status = leak.resolvedStatus === 2 ? "leak" : "normal"; }
        else { seg.status = "normal"; }
      } else {
        seg.status = "normal";
      }
      return seg;
    });
  } else {
    return [];
  }

  markers = data.monitors.map(mon => {
    return { id: mon.id, lat: mon.lat, lon: mon.long, status: mon.status };
  });
  return { markers, segments };
}

export const fetchMapsData = () => (dispatch) => {
  dispatch(fetchMapsDataBegin());

  var data = getData(dispatch);
  data
    .then(res => {
      dispatch(fetchMapsDataSuccess(formatMapData(res)));
    })
    .catch(error => {
      dispatch(fetchMapsDataFailure(error));
    });
};

export const fetchPollMapsData = () => (dispatch) => {
  dispatch(fetchPMapsDataBegin());

  var data = getData(dispatch);
  data
    .then(res => {
      dispatch(fetchPMapsDataSuccess(formatMapData(res)));
    })
    .catch(error => {
      dispatch(fetchPMapsDataFailure(error));
    });
}
