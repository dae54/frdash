import React, { useState, useEffect } from 'react'
import SocketIOClient from 'socket.io-client'
import moment from 'moment'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'

import URL from '../../URL'

export default function Notifications(props) {
    const { id } = JSON.parse(localStorage.getItem('userDetails'))
    const [notifs, setNotifs] = useState([])
    useEffect(() => {
        // console.log(tokenParams())
        const socket = SocketIOClient(URL, {
            query: {
                userID: `${id}`
            }
        })
        // console.log(socket)
        socket.emit('subscribe', { token: sessionStorage.getItem('token') })
        socket.on('notifications', data => {
            // console.log(data)

            setNotifs(data)
            props.setNotificationCount(data.length)
        })
    }, [])
    return (
        <React.Fragment>
            {notifs.length ?
                notifs.map((item, index) => {
                    return (
                        <NotificationComp item={item} key={index} />
                    )
                })
                :
                <div className="">no notification</div>
            }
        </React.Fragment>
    )
}

const NotificationComp = ({ item }) => {
    const hist = useHistory()
    async function markRead() {
        await axios.patch(`${URL}/notifications/markread`, {
            requestId: item.requestId
        }).then(response => {
            console.log(response)
        }).catch(error => {
            console.error(error)
        })
    }
    async function handleRedirect() {
        await markRead()
        hist.replace('/')//go to root page
        hist.replace('request/profile', { requestId: item.requestId })//go to profile
    }

    return (
        <li className="notification-message" onClick={handleRedirect} style={{ cursor: 'pointer' }}>
            <Link to={'#'}>
                <div className="media">
                    <span className="avatar">
                        {/* <img alt="John Doe" src="assets/img/user.jpg" className="img-fluid" /> */}
                        <span className="avatar">{item.createdBy.firstName.slice(0, 1).toUpperCase()}</span>
                    </span>
                    <div className="media-body">
                        {/* <p className="noti-details"><span className="noti-title">John Doe</span> added new task <span className="noti-title">Patient appointment booking</span></p> */}
                        <span className="noti-title">{item.subject}</span>
                        <p className="noti-details">{item.createdBy.firstName} {item.createdBy.lastName} added new request </p>
                        <p className="noti-time"><span className="notification-time">{moment(item.createdAt).fromNow()}</span></p>
                    </div>
                </div>
            </Link>
        </li>
    )
}

// {/* <li className="notification-message">
//                                         <a href="activities.html">
//                                             <div className="media">
//                                                 <span className="avatar">
//                                                     <img alt="John Doe" src="assets/img/user.jpg" className="img-fluid" />
//                                                 </span>
//                                                 <div className="media-body">
//                                                     <p className="noti-details"><span className="noti-title">John Doe</span> added new task <span className="noti-title">Patient appointment booking</span></p>
//                                                     <p className="noti-time"><span className="notification-time">4 mins ago</span></p>
//                                                 </div>
//                                             </div>
//                                         </a>
//                                     </li>
//                                     <li className="notification-message">
//                                         <a href="activities.html">
//                                             <div className="media">
//                                                 <span className="avatar">V</span>
//                                                 <div className="media-body">
//                                                     <p className="noti-details"><span className="noti-title">Tarah Shropshire</span> changed the task name <span className="noti-title">Appointment booking with payment gateway</span></p>
//                                                     <p className="noti-time"><span className="notification-time">6 mins ago</span></p>
//                                                 </div>
//                                             </div>
//                                         </a>
//                                     </li>
//                                     <li className="notification-message">
//                                         <a href="activities.html">
//                                             <div className="media">
//                                                 <span className="avatar">L</span>
//                                                 <div className="media-body">
//                                                     <p className="noti-details"><span className="noti-title">Misty Tison</span> added <span className="noti-title">Domenic Houston</span> and <span className="noti-title">Claire Mapes</span> to project <span className="noti-title">Doctor available module</span></p>
//                                                     <p className="noti-time"><span className="notification-time">8 mins ago</span></p>
//                                                 </div>
//                                             </div>
//                                         </a>
//                                     </li>
//                                     <li className="notification-message">
//                                         <a href="activities.html">
//                                             <div className="media">
//                                                 <span className="avatar">G</span>
//                                                 <div className="media-body">
//                                                     <p className="noti-details"><span className="noti-title">Rolland Webber</span> completed task <span className="noti-title">Patient and Doctor video conferencing</span></p>
//                                                     <p className="noti-time"><span className="notification-time">12 mins ago</span></p>
//                                                 </div>
//                                             </div>
//                                         </a>
//                                     </li>
//                                     <li className="notification-message">
//                                         <a href="activities.html">
//                                             <div className="media">
//                                                 <span className="avatar">V</span>
//                                                 <div className="media-body">
//                                                     <p className="noti-details"><span className="noti-title">Bernardo Galaviz</span> added new task <span className="noti-title">Private chat module</span></p>
//                                                     <p className="noti-time"><span className="notification-time">2 days ago</span></p>
//                                                 </div>
//                                             </div>
//                                         </a>
//                                     </li> */}