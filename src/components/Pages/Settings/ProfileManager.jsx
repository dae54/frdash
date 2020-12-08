import React, { useEffect } from 'react'
import { AppContext } from '../../services/AppContext'

export default function ProfileManager() {
    const { dispatch } = React.useContext(AppContext)
    let setBreadcrumbPath = path => dispatch({ type: 'breadcrumbPath', payload: path })

    useEffect(() => {
        setBreadcrumbPath([
            { name: 'Profile Manage' },
        ])
    }, [])
    return (
        <React.Fragment>
            <div className="row">
                <div className="col">
                    Coming soon
                </div>
            </div>
        </React.Fragment>
    )
}
