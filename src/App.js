import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import home from './pages/home'
import login from './pages/login'
import signup from './pages/signup'
import Navbar from './components/Navbar'
import './App.css'
import axios from 'axios'
import themeFile from './util/theme'
import jwtDecode from 'jwt-decode'
import AuthRoute from './util/AuthRoute'
//Redux
import { Provider } from 'react-redux'
import store from './redux/store'
import { SET_AUTHENTICATED } from './redux/types'
import { logoutUser, getUserData } from './redux/actions/userActions'

const theme = createMuiTheme(themeFile)

const token = localStorage.FBIdToken

if(token){
  const decodedToken = jwtDecode(token)
  if(decodedToken.exp * 1000 < Date.now()){    
    store.dispatch(logoutUser())
    window.location.href = '/login'
  } else {
    store.dispatch({ type: SET_AUTHENTICATED })
    axios.defaults.headers.common['Authorization'] = token
    store.dispatch(getUserData())
  }
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Navbar/>
          <div className='container'>        
            <Switch>
              <Route exact path='/' component={home} />
              <AuthRoute exact path='/login' component={login} />
              <AuthRoute exact path='/signup' component={signup} />
            </Switch>
          </div>
        </Router>
      </Provider>      
    </ThemeProvider>
  )
}

export default App
