import { combineReducers } from 'redux';
import SegmentLeaksReducer from './SegmentLeaksReducer';
import SegmentLeaksByIdReducer from './SegmentLeaksByIdReducer';
import LeakLitresReducer from './LeakLitresReducer';
import TankLevelReducer from './TankLevelReducer';
import LeaksResolvedReducer from './LeaksResolvedReducer';
import SegmentEventsReducer from './SegmentEventsReducer';

export default combineReducers({
	leaks: SegmentLeaksReducer,
	leak: SegmentLeaksByIdReducer,
	litres: LeakLitresReducer,
	levels: TankLevelReducer,
	leaksResolves: LeaksResolvedReducer,
	events: SegmentEventsReducer
})


