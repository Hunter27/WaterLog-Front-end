import { combineReducers } from 'redux';
import segmentLeaksReducer from './SegmentLeaksReducer';
import leakLitresReducer from './LeakLitresReducer';

export default combineReducers({
  leaks: segmentLeaksReducer,
  litres: leakLitresReducer
});
