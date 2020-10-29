import React, { useReducer } from "react";

let initialState = {
    breadcrumbPath: []

    // isAuthorized: localStorage.getItem('token') ? true : false,
    // // isAuth: { status: true, token: localStorage.getItem('token') },
    // // token: localStorage.getItem('token'),
    // isLocked: false,
    // userDetails: JSON.parse(localStorage.getItem('userDetails')) || '',
    // authIssuedAt: '',
    // idleTimeDuration: 0

    // budgetName: '', budgetDescription: '', budgetItems: [], budgetId: '',
    // fetchNew: '', activateBudget: false, startDate: new Date().toLocaleDateString(), endDate: ''
}
let reducer = (state, action) => {
    switch (action.type) {
        case 'breadcrumbPath':
            return { ...state, breadcrumbPath: state.breadcrumbPath = action.payload }
            
        // case 'token':
        //     return { ...state, token: state.token = action.payload }
        // erDetails: state.userDetails = action.payload }
        // case 'authIssuedAt':case 'isLocked':
        //     return { ...state, isLocked: state.isLocked = action.payload }
        // case 'authIssuedAt':
        //     return { ...state, authIssuedAt: state.authIssuedAt = action.payload }
        // case 'idleTimeDuration':
        //     return { ...state, idleTimeDuration: state.idleTimeDuration = action.payload }
        // case 'userDetails':
        //     return { ...state, us
        //     return { ...state, authIssuedAt: state.authIssuedAt.concat(action.payload) }
    }
}

const AppContext = React.createContext({});

const AppContextProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    let value = { state, dispatch }
    return (
        <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
    )
}

const AppContextConsumer = AppContext.Consumer;
export { AppContext, AppContextConsumer, AppContextProvider }