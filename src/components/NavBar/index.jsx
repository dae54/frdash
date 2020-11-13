import React, { useState } from 'react'
import { AuthContext } from '../Auth/AuthContext'
import { useHistory } from 'react-router-dom'
import Notifications from './Notifications'
// import { tokenParams, removeToken } from '../Auth/sessionControl'
import logo from '../Assets/images/radial.png'

import { setAvatar } from '../AccessoryFunctions/avatarGenerator'
import Breadcrumb from '../Gadgets/Breadcrumb'
export default function Index() {
    const hist = useHistory()
    console.log('object')
    const { state, dispatch } = React.useContext(AuthContext)
    const [notificationCount, setNotificationCount] = useState(0)
    let setIsAuthorized = isAuthorized => dispatch({ type: 'isAuthorized', payload: isAuthorized })
    let setIsLocked = isLocked => dispatch({ type: 'isLocked', payload: isLocked })

    function logout() {
        const logout = window.confirm('You are about to be logged out, Proceed?')
        if (logout) {
            localStorage.removeItem('token')
            localStorage.removeItem('userDetails')
            setIsAuthorized(false)
            window.location.replace('/login')
        }
    }

    function lock() {
        sessionStorage.setItem('pathname', hist.location.pathname)
        sessionStorage.setItem('state', JSON.stringify(hist.location.state || ''))
        localStorage.removeItem('token')

        setIsLocked(true)

        // localStorage.removeItem('token')
        // window.location.replace('/lock')

        // const tp = tokenParams()
        // if (tp) {
        //     const { displayName, email, id } = tp
        //     sessionStorage.setItem('ttp', JSON.stringify({ displayName, email, id }))
        //     removeToken()
        // window.location.replace('/lock')
        // }
    }
    return (
        <React.Fragment>
            <div className="header">
                <div className="header-left">
                    <a href="index-2.html" className="logo">
                        <img src={logo} width="35" height="35" alt="" />
                        <span>Fund Request</span>
                    </a>
                </div>
                <a id="toggle_btn" href=""><i className="fa fa-bars"></i></a>
                <a id="mobile_btn" className="mobile_btn float-left" href="#sidebar"><i className="fa fa-bars"></i></a>
                <div>
                    <Breadcrumb />
                </div>

                <ul className="nav user-menu float-right">
                    <li className="nav-item dropdown d-none d-sm-block">
                        <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown"><i className="fa fa-bell-o"></i> <span className="badge badge-pill bg-danger float-right">{notificationCount}</span></a>
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
                    {/* {state.userDetails === '' ?
                        // 'wait'
                        <li className="nav-item dropdown">
                            <a href="#">Initializing...</a>
                        </li>
                        : */}
                    <li className="nav-item dropdown has-arrow">
                        <a href="#" className="dropdown-toggle nav-link user-link" data-toggle="dropdown">
                            {state.userDetails === '' ?
                                <span className="">Initializing...</span>
                                :
                                <>
                                    <span className="user-img">
                                        <span className="avatar">{setAvatar(state.userDetails.firstName, state.userDetails.lastName)}</span>
                                        {/* <span className="avatar">{setAvatar(JSON.parse(localStorage.getItem('userDetails')).displayName.split(' ')[0], localStorage.getItem('userDetails')).displayName.split(' ')[1]}</span> */}

                                        {/* <img className="rounded-circle" src="assets/img/user.jpg" width="24" alt="Admin" /> */}
                                        {/* <span className="status online"></span> */}
                                    </span>
                                    <span className='text-uppercase'>{`${state.userDetails.firstName} ${state.userDetails.lastName}`}
                                        <small>
                                            ({state.userDetails.role.name})
                                    </small>
                                    </span>
                                </>
                            }
                            {/* <p><small>asdf</small></p> */}
                        </a>
                        <div className="dropdown-menu text-center">
                            <div className="row pl-5 pr-5">
                                <div className="col">
                                    {/* <span className="avatar">{state.userDetails.displayName.slice(0, 1).toUpperCase()}</span> */}
                                    <div className='row'>
                                        <i className="fa fa-key rounded-circle shadow-sm p-3 mr-3" style={{ cursor: 'pointer' }} onClick={logout}></i>
                                        <i className="fa fa-lock rounded-circle shadow-sm p-3" style={{ cursor: 'pointer' }} onClick={lock}></i>
                                    </div>
                                </div>
                            </div>
                            {/* <a className="dropdown-item" href="edit-profile.html">Edit Profile</a>
                            <a className="dropdown-item" href="settings.html">Settings</a>
                            <a className="dropdown-item" data-toggle="modal" data-target="#logoOutModal">Logout</a> */}
                        </div>
                    </li>
                    {/* } */}


                </ul>
                <div className="dropdown mobile-user-menu float-right">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v"></i></a>
                    <div className="dropdown-menu dropdown-menu-right">
                        <a className="dropdown-item" href="profile.html">My Profile</a>
                        <a className="dropdown-item" href="edit-profile.html">Edit Profile</a>
                        <a className="dropdown-item" href="settings.html">Settings</a>
                        <a className="dropdown-item" data-toggle="modal" data-target="#logoOutModal">Logout</a>
                    </div>
                </div>
                {/* <Logout /> */}
            </div>
        </React.Fragment>
    )
}


// function Logout() {
//     return (
//         <React.Fragment>
//             {/* <div className="modal fade" id="logoOutModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
//                 <div className="modal-dialog" role="document">
//                     <div className="modal-content">
//                         <div className="modal-header">
//                             <h5 className="modal-title">Alert!!!</h5>
//                         </div>
//                         <div className="modal-body">
//                             You about to be logged out...
//                         </div>
//                         <div className="modal-footer">
//                             <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
//                             <button type="button" className="btn btn-primary" onClick={removeToken}>Log Out</button>
//                         </div>
//                     </div>
//                 </div>
//             </div> */}
//             <div className="modal fade" id="logoOutModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
//                 <div className="modal-dialog modal-dialog-scrollable modal-md" role="document">
//                     <div className="modal-content">
//                         <div className="modal-body">
//                             <div className="row">
//                                 <div className="col-3">
//                                     <i className="fa fa-times-circle-o text-danger" style={{ fontSize: '100px', fontWeight: '10' }}></i>
//                                 </div>
//                                 <div className="col">
//                                     You are about to delete <br />
//                                     {/* <span className="text-weight-bold">Budget Name: </span>{props.budget.name}<br />
//                                     Created At: {props.budget.createdAt}<br /> */}
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="modal-footer">
//                             {/* {!budgetDeleted && */}
//                             <>
//                                 <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
//                                 <button type="button" className="btn btn-primary">Confirm Delete</button>
//                             </>
//                             // }
//                             {/* {budgetDeleted &&
//                                 <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={doneDelete}>Close</button>
//                             } */}

//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </React.Fragment>
//     )
// }
