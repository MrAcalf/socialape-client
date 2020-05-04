import {UserActionTypes,UiActionTypes,DataActionTypes} from '../types';

const initialState = {
    authenticated: false,
    credentials: {},
    likes: [],
    notifications: [],
    loading: false
};


export default function(state = initialState, action)
{
    switch(action.type)
    {
        case UserActionTypes.SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            };
        case UserActionTypes.SET_UNAUTHENTICATED:
            return initialState;
        case UserActionTypes.SET_USER:
            return {
                authenticated: true,
                loading: false,
                ...action.payload
            };
        case UserActionTypes.LOADING_USER:
            return {
                ...state,
                loading: true,
            };
        case DataActionTypes.LIKE_SCREAM:
            return {
                ...state,
                likes: [
                    ...state.likes,
                    {
                        userHandle: state.credentials.handle,
                        screamId: action.payload.screamId
                    }
                ]
            };
        case DataActionTypes.UNLIKE_SCREAM:
            return {
                ...state,
                likes: state.likes.filter(like => like.screamId !== action.payload.screamId)
            };
        case UserActionTypes.MARK_NOTIFICATIONS_READ:
            state.notifications.forEach(notification=>notification.read=true);
            return {
                ...state
            };
        default:
            return state;
    }
}