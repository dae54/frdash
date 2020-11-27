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

import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

export default function Home() {
    const hist = useHistory()
    const { state, dispatch } = React.useContext(AuthContext)
    let setIdleTimeDuration = idleTimeDuration => dispatch({ type: 'idleTimeDuration', payload: idleTimeDuration })
    let setIsLocked = isLocked => dispatch({ type: 'isLocked', payload: isLocked })

    function _onIdle(e) {
        alert('You are locked')
        setIsLocked(true)
        // sessionStorage.setItem('hist',JSON.stringify(hist))
        sessionStorage.setItem('pathname', hist.location.pathname)
        sessionStorage.setItem('state', JSON.stringify(hist.location.state || ''))
        localStorage.removeItem('token')
    }

    function getIdleTime() {
        axios.get('/settings/idleTime')
            .then(response => {
                setIdleTimeDuration(response.data.data.value)
            })
            .catch(error => {
                console.log(error.message)
                if (error.message === 'Network Error') {
                    return
                }
                if (error.response.status === 401) {
                    alert("unfortunately we cant let you in. try again later")
                    localStorage.removeItem('token')
                    localStorage.removeItem('userDetails')
                    window.location.replace('login')
                }
            })
    }

    useEffect(() => {
        getIdleTime()
    }, [])

    const options = {
        // you can also just use 'bottom center'
        position: positions.BOTTOM_RIGHT,
        timeout: 5000,
        offset: '30px',
        // you can also just use 'scale'
        transition: transitions.SCALE
    }

    return (
        <AlertProvider template={AlertTemplate} {...options}>
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
        </AlertProvider >
    )
}