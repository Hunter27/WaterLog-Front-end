import {combineReducers} from 'redux';
import noticeReducer from './noticeReducer';
import sensorReducer from './sensorReducer';

export default combineReducers({
    notices: noticeReducer,
    sensors:sensorReducer
})