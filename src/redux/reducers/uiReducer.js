import {UiActionTypes} from '../types';

const initialState = {
    loading: false,
    errors: null
};

export default function(state=initialState,action)
{
    switch(action.type)
    {
        case UiActionTypes.SET_ERRORS:
            return{
                ...state,
                loading: false,
                errors: action.payload
            };
        case UiActionTypes.CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                errors: null
            };
        case UiActionTypes.LOADING_UI:
            return {
                ...state,
                loading: true
            };
        case UiActionTypes.STOP_LOADING_UI:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
}