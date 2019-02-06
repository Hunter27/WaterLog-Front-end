import { combineReducers } from 'redux';
import sensorReducer from './sensorReducer';
import segmentsReducer from './segmentsReducer';

export default combineReducers({
    sensors: sensorReducer,
    segments: segmentsReducer
})