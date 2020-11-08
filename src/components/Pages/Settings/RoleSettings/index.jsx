import React, { useEffect } from 'react'
import Roles from './Roles'
// import ModuleAccess from './ModuleAccess'
import ModulePermission from './ModulePermission'
import { RolePermissionContextProvider } from './RoleContext'
import { AppContext } from '../../../services/AppContext'

export default function Index() {
    const { dispatch } = React.useContext(AppContext)
    let setBreadcrumbPath = path => dispatch({ type: 'breadcrumbPath', payload: path })

    useEffect(() => {
        setBreadcrumbPath([
            { name: 'Settings' },
        ])
    }, [])
    return (
        <React.Fragment>
            <RolePermissionContextProvider>
                <div className="content">
                    <div className="row">
                        <div className="col-sm-8">
                            <h4 className="page-title">Roles & Permissions</h4>
                        </div>
                    </div>
                    <div className="row">
                        <Roles />
                        <div className="col-sm-8 col-md-8 col-lg-8 col-xl-6">
                            {/* <ModuleAccess /> */}
                            <ModulePermission />
                        </div>
                    </div>
                </div>
            </RolePermissionContextProvider>
        </React.Fragment>
    )
}

/**
 * by default we have 3 roles,
 * Admin,  Fund Aprover, Fund Requester
 * for the dashboard, no fund requester, so 2 roles left
 * 
 * additional roles includes accountant
 * 
 * 
 * ADMIN
 * admin can do literary everything, so all permissions given to him
 * REQUESTS
 *  ___________________________________________________________________________________
 * |REQUESTS                    |USERS                  |BUDGETS
 * |----------------------------|-----------------------|------------------------------
 * |CRUD                        |CRUD                   |CRUD 
 * |                            |view user details      |view all
 * |                            |view user list         |view details
 * |                            |                       |
 * 
 * 
 * 
 * 
 * 
 * ACCOUNTANT
 * CRUD budget
 * generate report
 * view all budgets
 * view requests
 * 
 * 
 * ACCOUNTANT NO
 * edit user
 * delete request
 * update request
 * 
 * 
 * 
 * 
 * 
 * FUND APROVER
 * > read requests
 * > aprove request
 * > delete request, temporarily
 * > 
 * 
 * 
 * > view user details
 * > 
 * can be many
 */