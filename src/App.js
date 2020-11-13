import React from 'react';
import axios from 'axios'
import { Route, BrowserRouter } from "react-router-dom";

import { openRoutes } from './Routes'
import { AuthContextProvider } from './components/Auth/AuthContext'
// import { AuthContext } from './components/Auth/AuthContext'

import URL from './URL'
import Home from './Home';
import PrivateArea from './components/PrivateArea';

// import validateToken from './components/services/sessionManager'
// start of axios config
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
// axios.defaults.timeout = 540000
axios.defaults.timeout = 20000
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
  // if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
  //   // alert('reloading')
  //   var a = window.confirm('you are about to reload, proceed')
  //   if(!a){
  //   }
  //   console.info("This page is reloaded");
  // } else {
  //   console.info("This page is not reloaded");
  // }
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

export default App;
