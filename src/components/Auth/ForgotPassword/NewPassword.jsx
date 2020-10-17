import React, { useState, useEffect } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import axios from 'axios'
import URL from '../../../URL'

export default function NewPassword() {
    const hist = useHistory()
    const [code, setCode] = useState('')
    const [password, setPassword] = useState('')
    const [repassword, setRepassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [passwordChanged, setPasswordChanged] = useState(false)
    function handleSubmit(e) {
        e.preventDefault()
        axios.patch(`${URL}/user/verifyCode`, {
            code, password
        }).then(response => {
            console.log(response)
            setPasswordChanged(response.data.data.status)
            // if (response.data.data.status) {
            //     hist.replace('/login')
            // }
        }).catch(error => {
            console.log(error)
            setError(error.response.data.userMessage)
        })
    }
    return (
        <React.Fragment>
            <div className="main-wrapper account-wrapper">
                <div className="account-page">
                    <div className="account-center">
                        <div className="account-box">
                            {!passwordChanged ?
                                <div className="error-box">
                                    <form onSubmit={handleSubmit}>
                                        <div className="lock-user">
                                            <img className="rounded-circle" src="assets/img/user.jpg" alt="" />
                                        </div>
                                        <div className="alert alert-info fade show mt-4" role="alert">
                                            A 5 digit verification code has been sent to the email you have provided. Use it within 20 minutes.<br />
                                        </div>
                                        <div className="form-group">
                                            <input className="form-control" placeholder="Enter code received via Email" autoComplete="new-password" autoFocus='true' autoCorrect='off' type="text" value={code} onChange={(e) => setCode(e.target.value)} maxLength={6} />
                                        </div>
                                        <span className='text-primary'>New Password</span><br /><br />
                                        <div className="form-group">
                                            <input className="form-control" placeholder="Enter New Password" type="password" minLength='8' autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={code.length < 6} />
                                        </div>
                                        <div className="form-group">
                                            <input className="form-control" placeholder="Re enter New Password" type="password" minLength='8' value={repassword} onChange={(e) => setRepassword(e.target.value)} disabled={code.length < 6} />
                                        </div>

                                        <div className="form-group">
                                            <button type="submit" className='btn btn-info btn-block mb-4' disabled={code.length < 6 || password != repassword || password.length === 0}>Change Password</button>
                                        Remember your password?
                                        <NavLink to='/login'> Login </NavLink>
                                        </div>
                                    </form>
                                    {error &&
                                        <div className="alert alert-warning fade show mt-4" role="alert">
                                            {error}
                                        </div>
                                    }
                                </div>
                                :
                                <div className="alert alert-info fade show mt-4" role="alert">
                                    Congrats. you have successfuly changed your password. <NavLink to='/login'>Please Login to continue</NavLink>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
