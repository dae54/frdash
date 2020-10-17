import React, { useState, useEffect } from 'react'
import axios from 'axios'
import URL from '../../../../URL'
import { RolePermissionContext } from './RoleContext'

export default function Roles() {
    const { state, dispatch } = React.useContext(RolePermissionContext)

    let setRoles = roles => dispatch({ type: 'roles', payload: roles })
    let setNewRole = role => dispatch({ type: 'newRole', payload: role })

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [activeRole, setActiveRole] = useState()
    const [error, setError] = useState('')

    async function createRole(e) {
        setIsLoading(true)
        e.preventDefault()
        await axios.post(`${URL}/accessControl/roles`, {
            name, description
        }).then(response => {
            setIsLoading(false)
            setNewRole(response.data.data)
            console.log(response.data)
        }).catch(error => {
            setIsLoading(false)
            console.log(error)
        })
    }

    async function getRoles() {
        await axios.get(`${URL}/accessControl/roles`, {
        }).then(response => {
            console.log(response.data.data)
            setRoles(response.data.data)
            setActiveRole(response.data.data[0]._id)
        }).catch(error => {
            console.log(error)
        })
    }
    async function deleteRole(e) {
        setError('')
        console.log(e.target.getAttribute('name'))
        var confirmDelete = window.confirm('are you sure to delete role "' + e.target.getAttribute('name') + '"?')
        if (confirmDelete) {
            await axios.delete(`${URL}/accessControl/roles/${e.target.id}`, {
            }).then(response => {
                console.log(response.data)
                if (response.data) {
                    const newState = state.roles.filter(item => {
                        if (!(item._id === response.data.data._id)) {
                            return item
                        }
                    })
                    setRoles(newState)
                } else {

                }
            }).catch(error => {
                setError(error.response.data.userMessage)
                // console.log(error.response)
            })
        }
    }

    useEffect(() => {
        getRoles()
    }, [])

    return (
        <React.Fragment>
            <div className="col-sm-4 col-md-4 col-lg-4 col-xl-3">
                <button className="btn btn-primary btn-block" type="button" data-toggle="collapse" data-target="#addRole" aria-expanded="false" aria-controls="addRole">
                    <i className="fa fa-plus"></i> Add Roles
                </button>
                <div className="collapse" id="addRole">
                    <div className="card card-body">
                        <form onSubmit={createRole}>
                            <div className="form-group">
                                <label>Role Name</label>
                                <input type="text" className="form-control col-12" value={name} onChange={e => setName(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label>Role Description</label>
                                <textarea className="form-control col-12 " value={description} onChange={e => setDescription(e.target.value)} required />
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
                                <button type="submit" className="btn btn-primary btn-block">Save</button>
                            }
                        </form>
                    </div>
                </div>
                <div className="roles-menu">
                    {error &&
                        <div className="alert alert-warning alert-dismissible fade show" role="alert">
                            <strong>Warning!</strong> {error}.
                        </div>
                    }
                    <ul>
                        {state.roles.length ?
                            state.roles.map((item, index) => {
                                return (
                                    <RoleList key={item._id} index={index} item={item} deleteRole={deleteRole} activeRole={activeRole} setActiveRole={setActiveRole} />
                                )
                            })
                            :
                            <li className="">
                                <a>>No Entry</a>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </React.Fragment>
    )
}

const RoleList = (props) => {
    return (
        <li className={props.activeRole === props.item._id ? 'active' : ''}>
            <a onClick={() => props.setActiveRole(props.item._id)} style={{ cursor: 'pointer' }}>{props.item.name}</a>
            <span className="role-action">
                <span className="action-circle large">
                    <i className="fa fa-pencil"></i>
                    {/* <i className="material-icons">edit</i> */}
                </span>
                {!props.item.type &&
                    <span data-toggle="modal" data-target="#delete_role">
                        <span className="action-circle border-danger text-danger large delete-btn  ml-1">
                            <i className="fa fa-trash" id={props.item._id} name={props.item.name} onClick={props.deleteRole}></i>
                        </span>
                    </span>
                }
            </span>
        </li>
    )
}
const ErrorMessage = (props) => {
    return (
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Warning!</strong> {props.message}.
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )
}