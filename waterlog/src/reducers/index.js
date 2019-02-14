import { combineReducers } from 'redux';
import SegmentLeaksReducer from './SegmentLeaksReducer';
import SegmentLeaksByIdReducer from './SegmentLeaksByIdReducer';
import LeakLitresReducer from './LeakLitresReducer';
<<<<<<< HEAD
import SegmentEventsReducer from './SegmentEventsReducer';
=======
import LeaksResolvedReducer from './LeaksResolvedReducer';
import SegmentEventsReducer from './SegmentEventsReducer';
import PumpsReducer from './PumpsReducer';
>>>>>>> origin/Dev

export default combineReducers({
	leaks: SegmentLeaksReducer,
	leak: SegmentLeaksByIdReducer,
	litres: LeakLitresReducer,
<<<<<<< HEAD
	events: SegmentEventsReducer

=======
	leaksResolves: LeaksResolvedReducer,
	events: SegmentEventsReducer,
    pumps: PumpsReducer
>>>>>>> origin/Dev
});


