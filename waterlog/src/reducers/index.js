import { combineReducers } from 'redux';
import SegmentLeaksReducer from './SegmentLeaksReducer';
import SegmentLeaksByIdReducer from './SegmentLeaksByIdReducer';
import LeakLitresReducer from './LeakLitresReducer';
import SegmentLeaksHistoryReducer from './SegmentLeaksHistoryReducer';
import LeaksResolvedReducer from './LeaksResolvedReducer';
import SegmentEventsReducer from './SegmentEventsReducer';

export default combineReducers({
	leaks: SegmentLeaksReducer,
	leak: SegmentLeaksByIdReducer,
	litres: LeakLitresReducer,
<<<<<<< HEAD
    history: SegmentLeaksHistoryReducer,
	leaksResolves: LeaksResolvedReducer 
=======
	leaksResolves: LeaksResolvedReducer,
	events: SegmentEventsReducer
>>>>>>> Dev
});


