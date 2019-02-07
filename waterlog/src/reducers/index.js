import { combineReducers } from 'redux';
import sensorReducer from './sensorReducer';
import segmentsReducer from './segmentsReducer';
import segmentEventReducer from './segmentEventsReducer';
import segmentLeaksReducer from './segmentLeaksReducer';
import costsReducer from './costsReducer';
import segmentLeaksByIdReducer from './segmentLeaksByIdReducer';

export default combineReducers({
    sensors: sensorReducer,
    segments: segmentsReducer,
    events: segmentEventReducer,
    leaks: segmentLeaksReducer,
    costs: costsReducer,
    leak: segmentLeaksByIdReducer
})