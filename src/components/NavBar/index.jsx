import React, { useState } from 'react'
import { AuthContext } from '../Auth/AuthContext'

import Notifications from './Notifications'
import logo from '../Assets/images/radial.png'

import { setAvatar } from '../AccessoryFunctions/avatarGenerator'
import { AppContext } from '../services/AppContext'
export default function Index() {
    const { state } = React.useContext(AuthContext)
    const appContext = React.useContext(AppContext)
    const [notificationCount, setNotificationCount] = useState(0)

    function toggleSidebar() {
        const { state, dispatch } = appContext
        let toggleRightSidebar = () => dispatch({ type: 'rightSidebarOverlayOpened', payload: !state.rightSidebarOverlayOpened })
        toggleRightSidebar()
    }
    return (
        <React.Fragment>
            <div className="header">
                <div className="header-left">
                    <a href="index-2.html" className="logo">
                        <img className='d-none d-sm-block' src={logo} width="35" height="35" alt="" />
                        <span className=''>Fund Request</span>
                    </a>
                </div>
                <a id="toggle_btn" href="#a"><i className="fa fa-bars"></i></a>
                <a id="mobile_btn" className="mobile_btn float-left" href="#sidebar"><i className="fa fa-bars"></i></a>

                <div className='float-right text-dark'>
                    <div className="container">
                        <ul className="nav user-menu float-right">
                            <li className="nav-item dropdown">
                                <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown">
                                    <i className="fa fa-bell-o"></i>
                                    <span className="badge badge-pill bg-danger float-right">{notificationCount}</span>
                                </a>
                                <div className="dropdown-menu notifications">
                                    <div className="topnav-dropdown-header">
                                        <span>Notifications</span>
                                    </div>
                                    <div className="drop-scroll">
                                        <ul className="notification-list">
                                            <Notifications setNotificationCount={setNotificationCount} />
                                        </ul>
                                    </div>
                                    <div className="topnav-dropdown-footer">
                                        <a href="activities.html">View all Notifications</a>
                                    </div>
                                </div>
                            </li>
                            <li className='nav-item dropdown'>
                                <span className="user-img mt-1" onClick={toggleSidebar} style={{ cursor: 'pointer' }}>
                                    <span className="avatar" data-toggle="tooltip" data-placement="bottom"
                                        title={state.currentUser && state.currentUser.firstName + ' ' + state.currentUser.lastName}>
                                        {setAvatar(state.currentUser.firstName, state.currentUser.lastName)}</span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}