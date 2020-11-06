import React, { useReducer } from "react";
import { getUserDetails } from '../Auth/sessionControl'
console.log('state running')
let initialState = {
    isAuthorized: localStorage.getItem('token') ? true : false,
    // isAuth: { status: true, token: localStorage.getItem('token') },
    // token: localStorage.getItem('token'),
    isLocked: false,
    userDetails: '',
    authIssuedAt: '',
    idleTimeDuration: 0
}
let reducer = (state, action) => {
    switch (action.type) {
        case 'isAuthorized':
            return { ...state, isAuthorized: state.isAuthorized = action.payload }
        // case 'token':
        //     return { ...state, token: state.token = action.payload }
        case 'isLocked':
            return { ...state, isLocked: state.isLocked = action.payload }
        case 'authIssuedAt':
            return { ...state, authIssuedAt: state.authIssuedAt = action.payload }
        case 'idleTimeDuration':
            return { ...state, idleTimeDuration: state.idleTimeDuration = action.payload }
        case 'userDetails':
            return { ...state, userDetails: state.userDetails = action.payload }
    }
}

const AuthContext = React.createContext({});

const AuthContextProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    let value = { state, dispatch }
    return (
        <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
    )
}

const AuthContextConsumer = AuthContext.Consumer;
export { AuthContext, AuthContextConsumer, AuthContextProvider }