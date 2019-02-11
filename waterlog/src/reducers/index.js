import {
    combineReducers
} from 'redux';
import SensorReducer from './SensorReducer';
import SegmentsReducer from './SegmentsReducer';
import SegmentEventReducer from './SegmentEventsReducer';
import SegmentLeaksReducer from './SegmentLeaksReducer';
import SostsReducer from './CostsReducer';
import SegmentLeaksByIdReducer from './SegmentLeaksByIdReducer';

export default combineReducers({
    sensors: SensorReducer,
    segments: SegmentsReducer,
    events: SegmentEventReducer,
    leaks: SegmentLeaksReducer,
    costs: SostsReducer,
    leak: SegmentLeaksByIdReducer
})
