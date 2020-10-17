import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { validateToken } from './sessionControl'

import URL from '../../URL';

export default function Login({ hasAccount }) {

    const [error, setError] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const [emailError, setEmailError] = useState(false);
    // const [passError, setPassError] = useState(false)
    // const [errorMsg, setErrorMsg] = useState('')
    // const [networkError, setNetworkError] = useState(false)
    function submitForm(e) {
        e.preventDefault();
        const data = { email, password }
        axios.post(`${URL}/user/login`, {
            email, password
        }).then((response) => {
            sessionStorage.setItem('token', response.data.data.token)
            return window.location.replace('/')
        }).catch((error) => {

            // console.log(error.message)
            if (error.message === 'Network Error') {
                console.log('Network Error')
                setError('Check your Network Connections')
            }
            else setError('Sorry that didnt work. Please try again')

            // if (error.response.data.target === 'email') {
            //     setError('email')
            // } else if (error.response.data.target === 'password') {
            //     setError('password')
            // } else {
            //     console.error(error.response)
            // }
        })
    }
    useEffect(() => {
        if (validateToken()) {
            console.log('object')
            window.location.replace('/')
        }
    }, [])
    return (
        <React.Fragment>
            <div className="main-wrapper account-wrapper">
                <div className="account-page">
                    <div className="account-center">
                        <div className="account-box">
                            <form onSubmit={e => submitForm(e)} className="form-signin">
                                <div className="account-logo">
                                    <a href="index-2.html"><img src="assets/img/logo-dark.png" alt="" /></a>
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" autoFocus={true} className="form-control" name='email' value={email} onChange={e => setEmail(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" className="form-control" name='password' value={password} onChange={e => setPassword(e.target.value)} required />
                                </div>
                                <div className="form-group text-center">
                                    <button type="submit" className="btn btn-primary account-btn">Login</button>
                                </div>
                                <div className="text-center register-link">
                                    Forgot your password?<NavLink to="/resetPassword"> Change it here</NavLink>
                                </div>
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