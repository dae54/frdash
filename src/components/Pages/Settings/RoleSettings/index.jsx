import React, { useEffect } from 'react'
import Roles from './Roles'
import ModuleAccess from './ModuleAccess'
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
                        <div className="col-sm-8 col-md-8 col-lg-8 col-xl-9">
                            <ModuleAccess />
                            <ModulePermission />
                        </div>
                    </div>
                </div>
            </RolePermissionContextProvider>
        </React.Fragment>
    )
}
