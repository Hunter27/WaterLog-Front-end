import {
	FETCH_MAP_DATA_BEGIN,
	FETCH_MAP_DATA_SUCCESS,
	FETCH_MAP_DATA_FAILURE,
	FETCH_PMAP_DATA_BEGIN,
	FETCH_PMAP_DATA_SUCCESS,
	FETCH_PMAP_DATA_FAILURE,
	handleErrors
} from './Types';
import { Globals } from './../Globals';

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
	const response = await fetch(
		process.env.REACT_APP_API_URL + `/api/segments`)
		.then(handleErrors);
	const data = await response.json();
	return data;
}

async function getLeakInformation() {
	const response = await fetch(process.env.REACT_APP_API_URL + `/api/segmentleaks`)
		.then(handleErrors);
	const data = await response.json();
	return data;
}

async function getTankMonitors() {
	const response = await fetch(process.env.REACT_APP_API_URL + `/api/tankmonitors`)
		.then(handleErrors);
	const data = await response.json();
	return data;
}

async function getMonitors() {
	const response = await fetch(process.env.REACT_APP_API_URL + `/api/monitors`)
		.then(handleErrors);
	const data = await response.json();
	return data;
}

async function getData(dispatch) {
	var segments = await getSegments()
		.then((seg) => seg)
		.catch((error) => {
		dispatch(fetchMapsDataFailure(error));
	});

	var monitors = await getMonitors()
		.then((mon) => mon)
		.catch((error) => {
		dispatch(fetchMapsDataFailure(error));
	});

	var leaks = await getLeakInformation()
		.then((leak) => leak)
		.catch((error) => {
		dispatch(fetchMapsDataFailure(error));
	});

	var tanks = await getTankMonitors()
		.then((tank) => tank)
		.catch((error) => {
		dispatch(fetchMapsDataFailure(error));
	});

	return { segments, monitors, leaks, tanks };
}

function formatMapData(data) {
	let markers, segments, tanks, tankSegments;
	let todaysLeaks;
	if (!data.leaks) {
		todaysLeaks = [];
	} else {
		todaysLeaks = data.leaks.filter((leak) => leak.resolvedStatus === 2);
	}
	if (data.segments) {
		segments = data.segments.map((seg) => {
			if (JSON.stringify(Object.keys(seg)) !== JSON.stringify([
				'id',
				'senseIDOut',
				'senseIDIn',
				'faultCount']))
			{
				return [];
			}
			const leak = todaysLeaks.find((leak) => leak.segmentsId === seg.id);
			if (leak) {
				if (leak.resolvedStatus) {
					seg.status = leak.resolvedStatus === 2
						? 'leak'
						: 'normal';
				} else {
					seg.status = 'normal';
				}
			} else {
				seg.status = 'normal';
			}
			return seg;
		});
	} else {
		return [];
	}

	markers = data.monitors.map((mon) => {
		return {
			id: mon.id,
			lat: mon.lat,
			lon: mon.long,
			status: mon.status
		};
	});

	tanks = data.tanks.map((tank) => {
		return {
			id: tank.id,
			lat: tank.lat,
			lon: tank.long,
			status: tank.status
		};
	});

	tankSegments = data.tanks.map((tank) => {
		let endPoint = [];
		let endPointId;
		let endPointStatus;
		if (tank.connectedMonitorType === Globals.COMPONENT_TYPES.SENSOR) {
			const marker = markers.find((marker) => marker.id === tank.connectedMonitorID);
			endPoint = [ marker.lat, marker.lon ];
			endPointId = marker.id;
			endPointStatus = marker.status;
		} else if (tank.connectedMonitorType === Globals.COMPONENT_TYPES.TANK) {
			const _tank = data.tanks.find((tankT) => tankT.id === tank.connectedMonitorID);
			endPoint = [ _tank.lat, _tank.long ];
			endPointId = _tank.id;
			endPointStatus = _tank.status;
		}
		return {
			id1: tank.id,
			status1: tank.status,
			point1: [ tank.lat, tank.long ],
			id2: endPointId,
			point2: endPoint,
			status2: endPointStatus
		};
	});

	return { markers, segments, tanks, tankSegments };
}

export const fetchMapsData = () => (dispatch) => {
	dispatch(fetchMapsDataBegin());

	var data = getData(dispatch);
	data
		.then((res) => {
			dispatch(fetchMapsDataSuccess(formatMapData(res)));
		})
		.catch((error) => {
			dispatch(fetchMapsDataFailure(error));
		});
};

export const fetchPollMapsData = () => (dispatch) => {
	dispatch(fetchPMapsDataBegin());

	var data = getData(dispatch);
	data
		.then((res) => {
			dispatch(fetchPMapsDataSuccess(formatMapData(res)));
		})
		.catch((error) => {
			dispatch(fetchPMapsDataFailure(error));
		});
};
