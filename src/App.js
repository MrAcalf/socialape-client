import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import home from './pages/home'
import login from './pages/login'
import signup from './pages/signup'
import Navbar from './components/Navbar'
import './App.css'


const theme = createMuiTheme({
  palette:{
    primary: {
      light: '#33c9dc',
      main: '#00bcd4',
      dark: '#008394',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff6333',
      main: '#ff3d00',
      dark: '#b22a00',
      contrastText: '#fff',
    },
    typography: {
      useNextVariants: true,
    }
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Navbar/>
          <div className='container'>          
            <Switch>
              <Route exact path='/' component={home} />
              <Route exact path='/login' component={login} />
              <Route exact path='/signup' component={signup} />
            </Switch>
          </div>
        </Router>
      </div>
    </ThemeProvider>
  )
}

export default App
