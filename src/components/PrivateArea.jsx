import React, { useEffect } from 'react'
import { Route, useHistory } from "react-router-dom";

import axios from 'axios';
import jwt_decode from 'jwt-decode'
import { AuthContext } from './Auth/AuthContext';

export default function PrivateArea({ component, ...rest }) {
    const { state, dispatch } = React.useContext(AuthContext)
    const setCurrentUser = currentUser => dispatch({ type: 'currentUser', payload: currentUser })
    // const [loading, setLoading] = useState(true)

    let clearToken = () => dispatch({ type: 'token', payload: null })
    const hist = useHistory()

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
