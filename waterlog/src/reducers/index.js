import {
    combineReducers
} from 'redux';
import sensorReducer from './SensorReducer';
import segmentsReducer from './SegmentsReducer';
import segmentEventReducer from './SegmentEventsReducer';
import segmentLeaksReducer from './SegmentLeaksReducer';
import costsReducer from './CostsReducer';
import segmentLeaksByIdReducer from './SegmentLeaksByIdReducer';

export default combineReducers({
    sensors: sensorReducer,
    segments: segmentsReducer,
    events: segmentEventReducer,
    leaks: segmentLeaksReducer,
    costs: costsReducer,
    leak: segmentLeaksByIdReducer
})