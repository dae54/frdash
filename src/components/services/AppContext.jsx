import React, { useReducer } from "react";

let initialState = {
    breadcrumbPath: [], rightSidebarOverlayOpened: false
}
let reducer = (state, action) => {
    switch (action.type) {
        case 'breadcrumbPath':
            return { ...state, breadcrumbPath: state.breadcrumbPath = action.payload }
        case 'rightSidebarOverlayOpened':
            return { ...state, rightSidebarOverlayOpened: state.rightSidebarOverlayOpened = action.payload }
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