import { combineReducers } from 'redux';

import SegmentLeaksReducer from './SegmentLeaksReducer';
import SegmentLeaksByIdReducer from './SegmentLeaksByIdReducer';
import LeakLitresReducer from './LeakLitresReducer';
import LeakHistoryReducer from './LeakLitresReducer';
import LeaksResolvedReducer from './LeaksResolvedReducer';

export default combineReducers({
	leaks: SegmentLeaksReducer,
	leak: SegmentLeaksByIdReducer,
	litres: LeakLitresReducer,
    history: LeakHistoryReducer,
	leaksResolves: LeaksResolvedReducer 
});
