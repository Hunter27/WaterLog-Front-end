import { FETCH_LEAK_LITRES } from "./Types";
import { Globals } from "./../Globals";

export const fetchLeakLitres = id => dispatch => {
  fetch(`${Globals.API_URL}/api/segmentleaks/litres${id}`)
    .then(res => res.json())
    .then(leak => {
      dispatch({
        type: FETCH_LEAK_LITRES,
        payload: leak
      });
    })
    .catch(function(ex) {
      throw ex;
    });
};
