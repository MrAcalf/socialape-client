import {DataActionTypes, UiActionTypes} from '../types';
import axios from 'axios';

// Get All Screams
export const getScreams = ()=>dispatch=>{
    dispatch({type: UiActionTypes.LOADING_DATA});
    axios.get('/screams')
    .then(res=>{
        dispatch({
            type: DataActionTypes.SET_SCREAMS,
            payload: res.data
        });
    })
    .catch(err=>{
        dispatch({type: DataActionTypes.SET_SCREAMS,payload: []});
    })
};

// Get One Scream
export const getScream = (screamId)=>dispatch=>{
    dispatch({type: UiActionTypes.LOADING_UI});
    axios.get(`/scream/${screamId}`)
    .then(res=>{
        dispatch({type: DataActionTypes.SET_SCREAM, payload: res.data});
        dispatch({type: UiActionTypes.STOP_LOADING_UI});
    })
    .catch(err=>console.log(err));
};

// Like a Scream
export const likeScream = (screamId)=> dispatch => {
    axios.get(`/scream/${screamId}/like`)
    .then(res=>{
        dispatch({type: DataActionTypes.LIKE_SCREAM, payload: res.data});      
    })
    .catch(err=>console.log(err));
};

// Unlike a Scream
export const unlikeScream = (screamId)=> dispatch => {
    axios.get(`/scream/${screamId}/unlike`)
    .then(res=>{
        dispatch({type: DataActionTypes.UNLIKE_SCREAM, payload: res.data});      
    })
    .catch(err=>console.log(err));
};

//Post a Scream
export const postScream = newScream => dispatch=>{
    dispatch({type: UiActionTypes.LOADING_UI});
    axios.post('/scream',newScream)
    .then(res=>{
        dispatch({type: DataActionTypes.POST_SCREAM, payload: res.data});
        dispatch(clearErrors());
    })
    .catch(err=>{
        dispatch({type: UiActionTypes.SET_ERRORS, payload: err.response.data});
        console.log(err)
    });
};

//Delete a Scream
export const deleteScream = (screamId)=> dispatch =>{    
    axios.delete(`/scream/${screamId}`)
    .then(()=>{
        dispatch({type: DataActionTypes.DELETE_SCREAM, payload: screamId});
    })
    .catch(err => console.log(err));
};

//Clear Errors
export const clearErrors = ()=>dispatch=>{
    dispatch({type: UiActionTypes.CLEAR_ERRORS});
};

// Submit Comment
export const submitComment = (screamId,commentData)=>dispatch=>{
    axios.post(`/scream/${screamId}/comment`,commentData)
    .then(res=>{
        dispatch({type: DataActionTypes.SUBMIT_COMMENT,payload: res.data});      
        dispatch(clearErrors());
    })
    .catch(err=>{
        dispatch({type:UiActionTypes.SET_ERRORS, payload: err.response.data});
    });
};

// Get User Data
export const getUserData = (userHandle)=>dispatch=>{
    dispatch({type: UiActionTypes.LOADING_DATA});
    axios.get(`/user/${userHandle}`)
    .then(res=>{
        dispatch({type: DataActionTypes.SET_SCREAMS,payload: res.data.screams});
    })
    .catch(()=>{
        dispatch({type: DataActionTypes.SET_SCREAMS,payload: null});
    });
};

