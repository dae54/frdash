import React from 'react';
import axios from 'axios'
import {
  Route,
  BrowserRouter,
  Redirect,
} from "react-router-dom";

import { openRoutes } from './Routes'
import { AuthContextProvider } from './components/Auth/AuthContext'
import { AuthContext } from './components/Auth/AuthContext'

import URL from './URL'
import Home from './Home';

// import validateToken from './components/services/sessionManager'
// start of axios config
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
axios.defaults.timeout = 5400000
axios.defaults.baseURL = URL

// axios.interceptors.request.use(config => {
//   // setInterval(()=>{
//   //   console.log('just here')
//   // },500)
  
//   if (true) {
//     // console.log(config)
//     console.log('helo am have been called')
//     return config
//   }else{
//     console.log(config)
//   }

// }, error => {
//   console.log('error')
// })

// end of axios config
function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        {openRoutes.map((route, index) => {
          return (<Route exact path={route.link} key={index} component={route.component} />)
        })}
        <PrivateArea component={Home} />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

function PrivateArea({ component, ...rest }) {
  const { state } = React.useContext(AuthContext)
  return (
    state.isLocked ?
      <Redirect to="/lock" />
      :
      state.isAuthorized ?
        <Route {...rest} component={component} />
        :
        <Redirect to="/login" />
  )
}

export default App;
