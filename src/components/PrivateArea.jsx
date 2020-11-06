import React, { useState, useEffect } from 'react'
import { AuthContext } from './Auth/AuthContext'
import { Route, Redirect, } from "react-router-dom";
import Axios from 'axios';
import jwt_decode from 'jwt-decode'

export default function PrivateArea({ component, ...rest }) {
    const { state } = React.useContext(AuthContext)

    return (
        state.isLocked ?
            <Redirect to="/lock" />
            :
            state.isAuthorized ?
                <Authorized {...rest} component={component} />
                :
                <Redirect to="/login" />
    )
}


function Authorized({ component, ...rest }) {
    const { state, dispatch } = React.useContext(AuthContext)
    let setUserDetails = userDetails => dispatch({ type: 'userDetails', payload: userDetails })
    const [initializing, setInitializing] = useState(true)

    async function fetchUserDetails() {
        await Axios.get(`user/${jwt_decode(localStorage.getItem('token')).id}`)
            .then(res => {
                setUserDetails(res.data.data)
                setInitializing(false)
            })
            .catch(error => {
                console.log(error)
            })
    }
    useEffect(() => {
        fetchUserDetails();
    }, [])
    // if (initializing) {
    //     return (
    //         'initializing...'
    //     )
    // } else {
    //     return (<Route {...rest} component={component} />)
    // }
    return (
        // <>
        //     {state.userDetails === '' ?
        //         'initializing...'
        //         :
        <Route {...rest} component={component} />
        //     }
        // </>
    )
}
