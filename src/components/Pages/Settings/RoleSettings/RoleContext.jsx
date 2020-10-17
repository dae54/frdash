import React, { useReducer } from "react";

let initialState = {
    roles: [], permissions: [], rolesPermission: []
}
let reducer = (state, action) => {
    switch (action.type) {
        case 'roles':
            return { ...state, roles: state.roles = action.payload }
        case 'newRole':
            return { ...state, roles: state.roles.concat(action.payload) }
        case 'permissions':
            return { ...state, permissions: state.permissions = action.payload }
    }
}

const RolePermissionContext = React.createContext({});

const RolePermissionContextProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    let value = { state, dispatch }
    return (
        <RolePermissionContext.Provider value={value}>{props.children}</RolePermissionContext.Provider>
    )
}

const RolePermissionContextConsumer = RolePermissionContext.Consumer;
export { RolePermissionContext, RolePermissionContextConsumer, RolePermissionContextProvider }