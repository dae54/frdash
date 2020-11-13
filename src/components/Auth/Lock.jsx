import React, { useState, useEffect } from 'react'
import axios from 'axios'
import URL from '../../URL'
import { NavLink, useHistory } from 'react-router-dom'
import SocketIOClient from 'socket.io-client'

export default function Lock() {
    const hist = useHistory()
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [notificationCount, setNotificationCount] = useState(0)

    const { firstName, lastName, email, id } = JSON.parse(localStorage.getItem('userDetails'))
    function handleSubmit(e) {
        setLoading(true)
        e.preventDefault();
        axios.post('/user/login', {
            email, password
        }).then((response) => {
            setLoading(false)
            localStorage.setItem('token', response.data.data.token)
            hist.replace(sessionStorage.getItem('pathname'), JSON.parse(sessionStorage.getItem('state')))
            sessionStorage.removeItem('pathname')
            sessionStorage.removeItem('state')
            return hist.go(0)
        }).catch((error) => {
            setLoading(false)
            console.log(error)
            if (error.message === 'Network Error') {
                console.log('Network Error')
                setError('Check your Network connections')
            }
            else setError('Sorry, that didnt work. Please try again')
        })
    }
    useEffect(() => {
        // const socket = SocketIOClient(`${URL}/notificationCount`, {
        //     query: {
        //         userID: `${id}`
        //     }
        // })
        // // console.log(socket)
        // socket.emit('subscribe', { token: sessionStorage.getItem('token') })
        // socket.on('notificationsCount', data => {
        //     setNotificationCount(data)
        // })
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
                                        <h4 className='text-uppercase text-monospace'>{firstName} {lastName}</h4>
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control" placeholder="Enter Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        {loading ?
                                            <button type="button" disabled className='btn btn-info btn-block mb-4'>
                                                <div className="spinner-border spinner-border-sm" role="status">
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                               &nbsp; Please wait
                                            </button>
                                            :
                                            <button type="submit" className='btn btn-info btn-block mb-4'>UnLock</button>
                                        }
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
