import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { RolePermissionContext } from './RoleContext'
import { useAlert } from 'react-alert'

export default function ModulePermission() {
    const { state, dispatch } = React.useContext(RolePermissionContext)
    const [rolePermissions, setRolePermissions] = useState([])
    const [rowRolePermissions, setRowRolePermissions] = useState([])

    const alert = useAlert()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [genericName, setGenericName] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    let setPermissions = permissions => dispatch({ type: 'permissions', payload: permissions })

    async function fetchAllPermissions() {
        await axios.get(`/accessControl/permissions/`, {
        }).then(response => {
            setRowRolePermissions(response.data.data)
        }).catch(error => {
            console.log(error)
        })
    }

    async function fetchRolePermissions() {
        await axios.get(`/accessControl/roles/${state.activeRole}`, {
        }).then(response => {
            setRolePermissions(response.data.data)
        }).catch(error => {
            console.log(error)
        })
    }

    async function updateRolePermission() {
        await axios.patch(`/accessControl/permissions/${state.activeRole}`,
            { permissions: rolePermissions }
        )
            .then(response => {
                setRolePermissions(response.data.data)
                alert.success(response.data.message)
                window.location.replace('/settings/role')
            }).catch(error => {
                console.log(error)
            })
    }

    async function addPermission(e) {
        setIsLoading(true)
        e.preventDefault()
        console.log(e.target.id)
        await axios.post(`/accessControl/permissions`,
            { data: { moduleName: e.target.id, displayName: name, genericName, description } }
        )
            .then(response => {
                setIsLoading(false)
                setRowRolePermissions([...rowRolePermissions, response.data.data]) //add permission
                alert.success(response.data.message)
            }).catch(error => {
                setIsLoading(false)
                console.log(error)
            })
    }

    useEffect(() => {
        const permissions = rowRolePermissions.reduce((result, currentValue) => {
            (result[currentValue['moduleName']] = result[currentValue["moduleName"]] || []).push(
                currentValue
            )
            return result
        }, {})
        setPermissions(Object.values(permissions))
    }, [rowRolePermissions])

    useEffect(() => {
        fetchAllPermissions()
        fetchRolePermissions()
    }, [state.activeRole])

    useEffect(() => {
        fetchAllPermissions()
    }, [])
    return (
        <React.Fragment>
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title font-weight-bold">Permissions</h4>
                    <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit. </h5>
                </div>
                <div className="card-body pt-1">
                    {state.permissions.length > 0 ?
                        state.permissions.map(permission => {
                            console.log(permission)
                            return (
                                <div className='mb-3 border-bottom pb-1' key={permission._id}>
                                    <div className="title d-flex justify-content-between">
                                        <h5 className=''>{`${permission[0].moduleName.toUpperCase()}`}</h5>
                                        <span><input type="checkbox" disabled /> select all</span>
                                    </div>
                                    <div className="row row-cols-3 text-dark">
                                        {permission.map(item => {
                                            return (
                                                <div className="col bg-inf borde" key={item._id}>
                                                    <input className='mr-3'
                                                        type="checkbox"
                                                        checked={rolePermissions.includes(item._id)}
                                                        value={item._id}
                                                        onChange={(e) =>
                                                            rolePermissions.includes(e.target.value)
                                                                ? setRolePermissions(rolePermissions.filter((el) => (el !== e.target.value)))// delete permission
                                                                : setRolePermissions([...rolePermissions, e.target.value])} //add permission
                                                    /> {item.displayName}
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className="" style={{ display: 'flex', flexDirection: 'row-reverse' }} data-toggle="collapse" data-target={`#${permission[0].moduleName}`} aria-expanded="false" aria-controls="">
                                        <div className="btn btn-info btn-sm pt-0 pb-0 pl-4 pr-4"><i className="fa fa-plus"></i> Add</div>
                                    </div>
                                    <div className="collapse" id={permission[0].moduleName}>
                                        <div className="card">
                                            <div className="card-body">
                                                <form onSubmit={addPermission} id={permission[0].moduleName}>
                                                    <div className="form-row">
                                                        <div className="col">
                                                            <label for="inputEmail4" className='text-dark'>Permission Display Name</label>
                                                            <input type="text" className="form-control form-control-sm" placeholder={`eg. create ${permission[0].moduleName.toLowerCase()}`} value={name} onChange={e => setName(e.target.value)} required />
                                                        </div>
                                                        <div className="col">
                                                            <label for="inputEmail4" className='text-dark'>Permission Generic Name</label>
                                                            <input type="text" className="form-control form-control-sm" placeholder={`eg. create_${permission[0].moduleName.toLowerCase()}`} value={genericName} onChange={e => setGenericName(e.target.value)} required />
                                                        </div>
                                                    </div>
                                                    <div className="form-group pt-2">
                                                        <label>Permission Description</label>
                                                        <textarea className="form-control form-control-sm col-12" placeholder='Enter Permission Description' rows={2} style={{ resize: 'none' }} value={description} onChange={e => setDescription(e.target.value)} />
                                                    </div>

                                                    {isLoading ?
                                                        <button className="btn btn-primary" disabled>
                                                            <div>
                                                                <div className="spinner-border text-light spinner-border-sm " role="status">
                                                                    <span className="sr-only">Please Wait...</span>
                                                                </div>
                                                            &nbsp;Please Wait...
                                                        </div>
                                                        </button>
                                                        :
                                                        <button type="submit" className="btn btn-success btn-sm" style={{ display: 'flex', flexDirection: 'row-reverse' }}>Add new permission at `{permission[0].moduleName.toUpperCase()}` model</button>
                                                    }
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        :
                        'No data'
                    }
                    <div className="d-flex justify-content-between">
                        <div className="btn btn-info btn-sm pt-0 pb-0 pl-4 pr-4" style={{ cursor: 'not-allowed' }}><i className="fa fa-plus"></i> Add Module</div>
                        <div className="btn btn-success btn-sm pt-0 pb-0 pl-4 pr-4" onClick={updateRolePermission}><i className="fa fa-save"></i> Update</div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
