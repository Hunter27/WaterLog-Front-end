import { combineReducers } from 'redux';
import sensorReducer from './sensorReducer';
import segmentsReducer from './segmentsReducer';
import segmentEventReducer from './segmentEventsReducer';

export default combineReducers({
    sensors: sensorReducer,
    segments: segmentsReducer,
    events: segmentEventReducer
})