import { combineReducers } from 'redux';

import SegmentLeaksReducer from './SegmentLeaksReducer';
import SegmentLeaksByIdReducer from './SegmentLeaksByIdReducer';

export default combineReducers({
	leaks: SegmentLeaksReducer,
	leak: SegmentLeaksByIdReducer
});
