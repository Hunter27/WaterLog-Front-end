import { FETCH_TANK_GRAPH_BEGIN, FETCH_TANK_GRAPH_FAILURE, FETCH_TANK_GRAPH_SUCCESS, handleErrors } from "./Types";

export const fetchTankGraphBegin = () => ({
  type: FETCH_TANK_GRAPH_BEGIN
});

export const fetchTankGraphSuccess = (dailytankgraph) => ({
  type: FETCH_TANK_GRAPH_SUCCESS,
  payload: { dailytankgraph },
  loading: false
});

export const fetchTankGraphFailure = (error) => ({
  type: FETCH_TANK_GRAPH_FAILURE,
  payload: { error },
  loading: false
});

export const fetchTankGraphDaily = (id) => (dispatch) => {
  dispatch(fetchTankGraphBegin())
    fetch(process.env.REACT_APP_API_URL+`/api/TankReadings/graph/${id}`) 
      .then(handleErrors)
      .then(res => res.json())
      .then(dailytankgraph => {
        dispatch(fetchTankGraphSuccess(dailytankgraph));
        })
        .catch((error) => {
            dispatch(fetchTankGraphFailure(error));
        });
};
 