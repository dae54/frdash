//INITIALIZER

// USERS
let _editUser = false
let _deleteUser = false
let _addUser = false
let _updateUser = false
let _viewOneUser = false
let _viewUsers = false

// REQUESTS
export let canEditRequests = false
let _canDeleteRequests = false
let _canAddRequests = false
let _canUpdateRequests = false
let _canViewOneRequests = false
let _canViewURequests = false

// BUDGETS
let _canEdiBudget = false
let _canDeletBudget = false
let _canAdBudget = false
let _canUpdatBudget = false
let _canViewOnBudget = false
let _canViewBudget = false



// GETTERS
export const canEditUser = () => _editUser
export const canDeleteUser = () => _deleteUser
export const canAddUser = () => _addUser
export const canUpdateUser = () => _updateUser
export const canViewOneUser = () => _viewOneUser
export const canViewUsers = () => _viewUsers

// const canEditUser = () => _editUser
// const canEditUser = () => _editUser
// const canEditUser = () => _editUser






//REDUCER






export const initializePermissions = (currentUser) => {
    // currentUser.role.permissions;
}


// RESET PERMISSIONS
export const resetPermissions = () => {
    _editUser = false
    _deleteUser = false
    _addUser = false
    _updateUser = false
    _viewOneUser = false
    _viewUsers = false
}