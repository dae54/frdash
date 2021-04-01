import React from 'react';
import axios from 'axios'
import { Route, BrowserRouter } from "react-router-dom";

import { openRoutes } from './Routes'
import { AuthContextProvider } from './components/Auth/AuthContext'

import URL from './URL'
import Home from './Home';
import PrivateArea from './components/PrivateArea';

// START OF AXIOS CONFIG
axios.defaults.headers.common['Authorization'] =
  `Bearer ${localStorage.getItem('token')}` ||
  `Bearer ${sessionStorage.getItem('firstTimeLoginToken')}`;

axios.defaults.timeout = 20000
axios.defaults.baseURL = URL
// END

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        {openRoutes.map((route, index) => {
          return (
            <Route exact path={route.link} key={index} component={route.component} />
          )
        })}
        <PrivateArea component={Home} />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
