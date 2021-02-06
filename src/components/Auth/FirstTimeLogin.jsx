import React, { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import jwt_decode from 'jwt-decode'
import axios from 'axios'

export default function FirstTimeLogin({ tempToken, show, handleClose }) {
    const [password, setPassword] = useState('')
    const [re_password, setRe_Password] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [userName, setUserName] = useState('')
    const [firstTimeLoginToken] = useState(sessionStorage.getItem('firstTimeLoginToken'))
    const [passwordChanged, setPasswordChanged] = useState(false)

    async function handleChangePassword(e) {
        e.preventDefault()
        setLoading(true)
        await axios.patch('/user/resetpassword', {
            token: firstTimeLoginToken,
            password
        }).then(response => {
            console.log(response)
            setLoading(false)
            sessionStorage.removeItem('firstTimeLoginToken')
            setPasswordChanged(true)
            // localStorage.setItem('token', response.data.data.token)
            // localStorage.setItem('userDetails', JSON.stringify(jwt_decode(localStorage.getItem('token'))))
            // setToken(response.data.data.token)
            // return window.location.replace('/login')
        }).catch(error => {
            setLoading(false)

            console.log(error.response)
            console.log(error)
        })
        // fetch('/user/firstTimeLogin')
        // fetch('http://localhost:8080/user/firstTimeLogin', {
        //     method: 'PATCH',
        //     headers: {
        //         Authorization: `Bearer ${firstTimeLoginToken}`
        //     },
        //     body: password
        // }).then(response => {
        //     console.log(response)
        // }).catch(error => {
        //     console.log(error)
        // })


        // await axios.patch('/user/firstTimeLogin', {
        //     header: {
        //         Authorization: `Bearer ${firstTimeLoginToken}`
        //     },
        //     password
        // }).then(res => {
        //     console.log(res.data)
        // }).catch(error => {
        //     console.log(error)
        // })
        console.log('handleChangePassword')
    }
    const decodeUserName = () => {
        // let firstTimeLoginToken = sessionStorage.getItem('firstTimeLoginToken')
        try {
            let decodedToken = jwt_decode(firstTimeLoginToken)
            if ((Date.now() <= decodedToken.exp * 1000)) {
                return setUserName(decodedToken.displayName)
            } else {
                sessionStorage.removeItem('firstTimeLoginToken')
                return window.location.replace('/login')
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        decodeUserName()
    }, [])

    return (
        <Modal show={show} onHide={handleClose} backdrop="static" className=''>
            <Form onSubmit={handleChangePassword}>
                {passwordChanged ?
                    <Modal.Body>
                        <div className="alert alert-success text-center">
                            Password is successfully updated. Please Login again using your new password
                        </div>
                    </Modal.Body>
                    :
                    <Modal.Body>
                        <div className="alert alert-info text-center">
                            <h4 className='text-center text-capitalize' style={{ fontSize: 'x-large' }}>welcome {userName} </h4>
                                This is the first time you log in the system. Please RESET your password
                        </div>
                        <Form.Group controlId="password">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control type={showPassword ? 'text' : 'password'} placeholder="Enter new password" value={password} onChange={(e) => setPassword(e.target.value)} required min='8' max='16' />
                        </Form.Group>
                        <Form.Group controlId="repassword">
                            <Form.Label>Repeat Password</Form.Label>
                            <Form.Control type='password' placeholder="Repeat password" value={re_password} onChange={(e) => setRe_Password(e.target.value)} required />
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" value={showPassword} onChange={(e) => setShowPassword(!showPassword)} label={showPassword ? "Uncheck to Hide password" : 'Check to View password'} />
                        </Form.Group>
                    </Modal.Body>
                }
                <Modal.Footer>
                    {loading ?
                        <button className='btn btn-default btn-sm'>
                            <div className="spinner-border spinner-border-sm" role="status">
                                <span className="sr-only">Loading...</span>
                            </div> &nbsp; Verifying ...
                            </button>
                        :
                        <>
                            <Button
                                variant="default"
                                onClick={() => {
                                    sessionStorage.removeItem('firstTimeLoginToken')
                                    window.location.replace('/login')
                                }}>
                                Switch account
                            </Button>
                            {passwordChanged ?
                                <Button variant="info" type='button' onClick={handleClose}>
                                    Login
                                </Button>
                                :
                                <Button variant="primary" type='submit' disabled={password === re_password && password !== '' ? false : true}>
                                    Confirm
                                </Button>
                            }
                        </>
                    }
                </Modal.Footer>
            </Form>
        </Modal>
    )
}
