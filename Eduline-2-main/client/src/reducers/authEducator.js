import {
    REGISTER_EDUCATOR_SUCCESS,
    REGISTER_EDUCATOR_FAIL,
    EDUCATOR_LOADED,
    AUTH_EDUCATOR_ERROR,
    LOGIN_EDUCATOR_SUCCESS,
    LOGIN_EDUCATOR_FAIL,
    LOGOUT_EDUCATOR,
    DELETE_ACCOUNT
    
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isEducatorAuthenticated: null,
    loadingEducator: true,
    educator: null
}

export default function(state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case EDUCATOR_LOADED:
            return {
                ...state,
                isEducatorAuthenticated: true,
                loadingEducator: false,
                educator: payload
            };
        case REGISTER_EDUCATOR_SUCCESS:            
        case LOGIN_EDUCATOR_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isEducatorAuthenticated: true,
                loadingEducator: false
            };
        case REGISTER_EDUCATOR_FAIL:
        case LOGIN_EDUCATOR_FAIL:
        case DELETE_ACCOUNT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isEducatorAuthenticated: false,
                loadingEducator: false
            }; 
        case LOGOUT_EDUCATOR:
        case AUTH_EDUCATOR_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isEducatorAuthenticated: false,
                loadingEducator: false
            };         
        default:
            return state;
    }
}