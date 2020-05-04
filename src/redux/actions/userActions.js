import {UserActionTypes,UiActionTypes} from '../types';
import axios from 'axios';

// Set Authorization Token
const setAuthorizationToken = (token)=>{
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem('FBIdToken',FBIdToken);
  axios.defaults.headers.common['Authorization'] = FBIdToken; 
};

//Login User
export const loginUser = (userData,history)=> (dispatch)=>{
    dispatch({type: UiActionTypes.LOADING_UI});
    axios
      .post('/login', userData)
      .then((res) => {        
        setAuthorizationToken(res.data.token);  
        dispatch(getUserData());     
        dispatch({type: UiActionTypes.CLEAR_ERRORS});
        history.push('/');
      })
      .catch((err) => {
        dispatch({
            type: UiActionTypes.SET_ERRORS,
            payload: err.response.data
        });
      });
};

//Get User Data
export const getUserData = ()=> (dispatch)=>{
    dispatch({type: UserActionTypes.LOADING_USER});
    axios.get('/user')
    .then(res => {
        dispatch({type: UserActionTypes.SET_USER, payload: res.data});
    })
    .catch(err=>console.error(err));
};

//Logout User
export const logoutUser = ()=>(dispatch)=>{
  localStorage.removeItem('FBIdToken');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({type: UserActionTypes.SET_UNAUTHENTICATED});
};

//Signup User
export const signupUser = (newUserData,history)=> (dispatch)=>{
  dispatch({type: UiActionTypes.LOADING_UI});
  axios
    .post('/signup', newUserData)
    .then((res) => {        
      setAuthorizationToken(res.data.token);
      dispatch(getUserData());     
      dispatch({type: UiActionTypes.CLEAR_ERRORS});
      history.push('/');
    })
    .catch((err) => {
      dispatch({
          type: UiActionTypes.SET_ERRORS,
          payload: err.response.data
      });
    });
};


//Upload Image
export const uploadImage = (formData)=>(dispatch)=>{
  dispatch({type: UserActionTypes.LOADING_USER});
  axios.post('/user/image',formData)
  .then(()=>{
    dispatch(getUserData());
  })
  .catch(err => console.error(err));
};

//Edit User Details
export const editUserDetails = (userDetails)=>(dispatch)=>{
  dispatch({type: UserActionTypes.LOADING_USER});
  axios.post('/user',userDetails)
  .then(()=>{
    dispatch(getUserData());
  })
  .catch(err=>console.error(err));
};

//Mark NotificationsRead
export const markNotificationsRead = (notificationIds)=>dispatch=>{
  axios.post('/notifications',notificationIds)
  .then(res=>{
    dispatch({type: UserActionTypes.MARK_NOTIFICATIONS_READ});
  })
  .catch(err=>console.log(err));
};
