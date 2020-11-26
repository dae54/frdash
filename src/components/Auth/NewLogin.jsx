import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from './AuthContext'
import jwt_decode from 'jwt-decode'

import LeftImg from '../Assets/images/preview.png'

export default function NewLogin() {
    const { state, dispatch } = React.useContext(AuthContext)

    const lstyle = {
        background: `url(${LeftImg})`,
        height: '100vh',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    }

    const [error, setError] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false);
    let setIsAuthorized = isAuthorized => dispatch({ type: 'isAuthorized', payload: isAuthorized })
    // let setUserDetails = userDetails => dispatch({ type: 'userDetails', payload: userDetails })

    function submitForm(e) {
        e.preventDefault();
        setLoading(true)
        axios.post(`/user/login`, {
            email, password
        }).then((response) => {
            setLoading(false)
            localStorage.setItem('token', response.data.data.token)
            // localStorage.setItem('userDetails', JSON.stringify(response.data.data.user))
            localStorage.setItem('userDetails', JSON.stringify(jwt_decode(localStorage.getItem('token'))))
            // setUserDetails(response.data.data.user)
            setIsAuthorized(true)
            return window.location.replace('/')
        }).catch((error) => {
            setLoading(false)
            if (error.message === 'Network Error') {
                console.log('Network Error')
                setError('Check your Network Connections')
            }
            else setError('Sorry that didnt work. Please try again')
        })
    }

    useEffect(() => {
        if (state.isAuthorized) {
            window.location.replace('/')
        } else {
            localStorage.removeItem('userDetails')
        }
    }, [])
    return (
        <React.Fragment>
            <div className="row">
                <div className="col-6" style={lstyle}></div>
                <div className="col bg-white">
                    <div className="container d-flex justify-content-center text-center">
                        <div className="jumbotron bg-white text-default" style={{ width: '70%', marginTop: '15vh' }}>
                            <h1 className='font-weight-bold'>FUND REQUEST</h1>
                            <p className='mb-5 h4 text-muted'>Welcome back! Please Login to your account</p>
                            <form onSubmit={e => submitForm(e)}>
                                <input type="email" placeholder='Email' className="form-control mb-4" name='email' value={email} onChange={e => setEmail(e.target.value)} required />
                                <input type="password" placeholder='Password' className="form-control mb-4" name='password' value={password} onChange={e => setPassword(e.target.value)} required />
                                <div className='d-flex justify-content-between mb-4'>
                                    <span>
                                        <input type="checkbox" /> Remember me
                                    </span>
                                    <Link to="/resetPassword" className='text-default'>Forgot Password</Link>
                                </div>
                                {loading ?
                                    <div className="btn btn-default text-white  pl-5 pr-5 pt-3 pb-3">
                                        <div className="spinner-border text-white spinner-border-sm"></div> Please Wait...
                                    </div>
                                    :
                                    <button type='submit' className="btn btn-default text-white  pl-5 pr-5 pt-3 pb-3">Login</button>
                                }
                            </form>
                            {error &&
                                <div className="alert alert-warning fade show mt-4 text-center" role="alert">
                                    {error}
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
