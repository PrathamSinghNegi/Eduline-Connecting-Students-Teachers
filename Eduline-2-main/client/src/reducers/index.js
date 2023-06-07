import {combineReducers} from 'redux';
import alert from './alert';
import authEducator from './authEducator';
import authUser from './authUser';
import profile from './profile';
import appointment from './appointment';

export default combineReducers({
    alert,
    authEducator,
    authUser,
    profile,
    appointment
});
