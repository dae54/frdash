import React, { useEffect } from 'react'
import { Route, useHistory } from "react-router-dom";

import axios from 'axios';
import jwt_decode from 'jwt-decode'
import { AuthContext } from './Auth/AuthContext';
// import { initializePermissions } from './utilities/PemissionManager';

export default function PrivateArea({ component, ...rest }) {
    const { state, dispatch } = React.useContext(AuthContext)
    const setCurrentUser = currentUser => dispatch({ type: 'currentUser', payload: currentUser })
    const setPermissions = permissions => dispatch({ type: 'permissions', payload: permissions })
    // const [loading, setLoading] = useState(true)

    let clearToken = () => dispatch({ type: 'token', payload: null })
    const hist = useHistory()

    async function initializePermissions() {
        // console.log(state.currentUser.role.permission)
        const permissions = state.currentUser.role.permission.map(permission => {
            return permission.genericName
        })
        // console.log(permissions)
        setPermissions(permissions)
    }

    function verifyToken() {
        try {
            jwt_decode(state.token)
            return true
        } catch (error) {
            localStorage.removeItem('token')
            // setLoading(false)
            clearToken()
            hist.replace('/login')
        }
    }

    async function fetchCurrentUser() {
        await axios.get(`user/${jwt_decode(state.token).id}`, { headers: { Authorization: `Bearer ${state.token}` } })
            .then(({ data }) => {
                setCurrentUser(data.data)
                initializePermissions()

                // FIRE JS EVENT TO SHOW THAT USER IS AUTHORIZED
                const event = new Event('authorized');
                dispatchEvent(event)
            })
            .catch(error => {
                console.log(error)
                localStorage.removeItem('token')
                clearToken()
                hist.replace('/login')
            }).finally(() => {
                // setLoading(false)
            })
    }

    useEffect(() => {
        verifyToken()
        const isTokenValid = verifyToken()
        if (isTokenValid) {
            fetchCurrentUser()
        }
    }, [state.token])

    return (
        state.currentUser &&
        <Route {...rest} component={component} />
    )
}
