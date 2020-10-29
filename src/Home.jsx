import React, { useEffect } from 'react'
import { Route, Switch, useHistory } from "react-router-dom";
import IdleTimer from 'react-idle-timer'
import axios from 'axios'
import { AuthContext } from './components/Auth/AuthContext'
import { AppContextProvider } from './components/services/AppContext';

import routes from './Routes'
import Sidebar from './components/SideBar/Sidebar'
import Navbar from './components/NavBar'
import Error404 from './components/Error404'

export default function Home() {
    const hist = useHistory()
    const { state, dispatch } = React.useContext(AuthContext)
    let setIdleTimeDuration = idleTimeDuration => dispatch({ type: 'idleTimeDuration', payload: idleTimeDuration })
    let setIsLocked = isLocked => dispatch({ type: 'isLocked', payload: isLocked })

    function _onIdle(e) {
        setIsLocked(true)
        // sessionStorage.setItem('hist',JSON.stringify(hist))
        sessionStorage.setItem('pathname', hist.location.pathname)
        sessionStorage.setItem('state', JSON.stringify(hist.location.state))
        localStorage.removeItem('token')
    }

    function getIdleTime() {
        axios.get('/settings/idleTime')
            .then(response => {
                setIdleTimeDuration(response.data.data.value)
                console.log(response.data.data.value)
            })
            .catch(error => {
                console.log(error.message)
                if (error.message === 'Network Error') {
                    return
                }
                if (error.response.status === 401) {
                    localStorage.removeItem('token')
                    localStorage.removeItem('userDetails')
                    window.location.replace('login')
                }
            })
    }

    useEffect(() => {
        getIdleTime()
    }, [])

    return (
        // <React.Fragment>
            <AppContextProvider>
                {state.idleTimeDuration &&
                    <IdleTimer
                        onIdle={(_onIdle)}
                        timeout={state.idleTimeDuration}
                    />
                }
                <div className="main-wrapper">
                    <Sidebar />
                    <Navbar />
                    <div className="page-wrapper">
                        <div className="content">
                            <Switch>
                                {routes.map((item, index) => {
                                    return (
                                        <Route exact path={item.link} key={index} component={item.component} />
                                    )
                                })}
                                <Route component={Error404} />
                            </Switch>
                        </div>
                    </div>
                </div>
            </AppContextProvider>
        // </React.Fragment>
    )
}