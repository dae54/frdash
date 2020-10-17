import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import URL from '../../../URL'

export default function ConfirmEmail(props) {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    // const [wordCount, setWordCount] = useState(6)
    // const [codeComplete, setCodeComplete] = useState(false)
    function handleSubmit(e) {
        e.preventDefault()
        axios.patch(`${URL}/user/forgotPassword`, {
            email: email
        }).then(response => {
            console.log(response)
            props.setEmailValid(true)
        }).catch(error => {
            setError(error.response.data.userMessage)
        })
    }
    // function handleChange(e) {
    //     setEmail(e.target.value)
    //     setWordCount(wordCount - 1)
    // }
    // useEffect(() => {
    //     console.log(wordCount)
    //     if (wordCount === 0) {
    //         setCodeComplete(true)
    //     }
    // }, [wordCount])

    return (
        <React.Fragment>
            <div className="main-wrapper account-wrapper">
                <div className="account-page">
                    <div className="account-center">
                        <div className="account-box">
                            <div className="error-box">
                                <form onSubmit={handleSubmit}>
                                    <div className="lock-user">
                                        <img className="rounded-circle" src="assets/img/user.jpg" alt="" />
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control" placeholder="Enter Your Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className='btn btn-info btn-block mb-4'>Request reset password</button>
                                        Remember your password?
                                        <NavLink to='/login' onClick={() => sessionStorage.removeItem('ttp')}> Login </NavLink><br />
                                        Have code already? <span onClick={() => props.setEmailValid(true)} className='text-info' style={{ cursor: 'pointer' }}>use it</span>
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
