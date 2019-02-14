import { combineReducers } from 'redux';

import SegmentLeaksReducer from './SegmentLeaksReducer';
import SegmentLeaksByIdReducer from './SegmentLeaksByIdReducer';
import LeakLitresReducer from './LeakLitresReducer';
import SegmentLeaksHistoryReducer from './SegmentLeaksHistoryReducer';
import LeaksResolvedReducer from './LeaksResolvedReducer';

export default combineReducers({
	leaks: SegmentLeaksReducer,
	leak: SegmentLeaksByIdReducer,
	litres: LeakLitresReducer,
    history: SegmentLeaksHistoryReducer,
	leaksResolves: LeaksResolvedReducer 
});
