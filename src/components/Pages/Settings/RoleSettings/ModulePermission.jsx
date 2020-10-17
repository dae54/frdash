import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { RolePermissionContext } from './RoleContext'

import URL from '../../../../URL'
export default function ModulePermission() {
    const { state, dispatch } = React.useContext(RolePermissionContext)
    let setPermissions = permissions => dispatch({ type: 'permissions', payload: permissions })


    async function fetchPermissions() {
        await axios.get(`${URL}/accessControl/permissions`, {
        }).then(response => {
            setPermissions(response.data.data)
        }).catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        fetchPermissions()
    }, [])
    return (
        <React.Fragment>
            <div className="table-responsive">
                <table className="table table-striped custom-table">
                    <thead>
                        <tr>
                            <th>Module / Permission</th>
                            {[...new Set(state.permissions.map(x => x.displayName))].map(item => {
                                return (
                                    <th className="text-center">{item}</th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {[...new Set(state.permissions.map(x => x.moduleName))].map(item => {
                            return (
                                <tr>
                                    <td>{item}</td>
                                    <td className="text-center">
                                        <input type="checkbox" checked="" />
                                    </td>
                                    <td className="text-center">
                                        <input type="checkbox" checked="" />
                                    </td>
                                    <td className="text-center">
                                        <input type="checkbox" checked="" />
                                    </td>
                                    <td className="text-center">
                                        <input type="checkbox" checked="" />
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    )
}
