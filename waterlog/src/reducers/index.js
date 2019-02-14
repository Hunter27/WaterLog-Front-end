import { combineReducers } from 'redux';
import SegmentLeaksReducer from './SegmentLeaksReducer';
import SegmentLeaksByIdReducer from './SegmentLeaksByIdReducer';
import LeakLitresReducer from './LeakLitresReducer';
import LeaksResolvedReducer from './LeaksResolvedReducer';
import SegmentEventsReducer from './SegmentEventsReducer';
import PumpsReducer from './PumpsReducer';
import TankLevelsByIdReducer from './TankLevelsByIdReducer';
import TankLevelReducer from './TankLevelReducer';

export default combineReducers({
	leaks: SegmentLeaksReducer,
	leak: SegmentLeaksByIdReducer,
	litres: LeakLitresReducer,
	leaksResolves: LeaksResolvedReducer,
	events: SegmentEventsReducer,
	levels: TankLevelReducer,
	level: TankLevelsByIdReducer,
    pumps: PumpsReducer
});


