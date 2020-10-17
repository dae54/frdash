import React, { useState, useEffect } from 'react'
import axios from 'axios'
import URL from '../../URL'
import { NavLink } from 'react-router-dom'
import SocketIOClient from 'socket.io-client'

export default function Lock() {
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [notificationCount, setNotificationCount] = useState(0)

    const { displayName, email, id } = JSON.parse(localStorage.getItem('userDetails'))
    function handleSubmit(e) {
        e.preventDefault();
        axios.post('/user/login', {
            email, password
        }).then((response) => {
            localStorage.setItem('token', response.data.data.token)
            return window.location.replace('/')
        }).catch((error) => {
            if (error.message === 'Network Error') {
                console.log('Network Error')
                setError('Check your Network connections')
            }
            else setError('Sorry, that didnt work. Please try again')
        })
    }
    useEffect(() => {
        const socket = SocketIOClient(`${URL}/notificationCount`, {
            query: {
                userID: `${id}`
            }
        })
        // console.log(socket)
        socket.emit('subscribe', { token: sessionStorage.getItem('token') })
        socket.on('notificationsCount', data => {
            setNotificationCount(data)
        })
    }, [])
    return (
        <React.Fragment>
            <div className="main-wrapper account-wrapper">
                <div className="account-page">
                    <div className="account-center">
                        <div className="account-box">
                            {notificationCount ?
                                <div className="alert alert-info fade show mt-4 text-center" role="alert">
                                    You have {notificationCount} new notifications
                                </div>
                                : ''
                            }
                            <div className="error-box">
                                <form onSubmit={handleSubmit}>
                                    <div className="lock-user">
                                        <img className="rounded-circle" src="assets/img/user.jpg" alt="" />
                                        <h4 className='text-uppercase text-monospace'>{displayName}</h4>
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control" placeholder="Enter Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className='btn btn-info btn-block mb-4'>UnLock</button>
                                        Not your account?
                                        <NavLink to='/login' onClick={() => sessionStorage.removeItem('ttp')}> Change Account</NavLink>
                                    </div>
                                </form>
                                {error &&
                                    <div className="alert alert-warning fade show mt-4" role="alert">
                                        {error}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
