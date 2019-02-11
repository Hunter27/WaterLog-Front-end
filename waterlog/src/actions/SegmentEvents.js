import {
    FETCH_SEGMENTS_EVENTS
} from "./Types";
import { Globals } from './../Globals';

export const fetchSegmentsEvents = () => dispatch => {
    fetch(`${Globals.API_URL}/api/segmentevents`) //Change to use either localhost/server
        .then(res => res.json())
        .then(events =>
            dispatch({
                type: FETCH_SEGMENTS_EVENTS,
                payload: events
            })
        )
        .catch(function(ex){
            throw ex;
        })
};