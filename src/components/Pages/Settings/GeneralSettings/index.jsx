import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { AuthContext } from '../../../Auth/AuthContext'

export default function GeneralSettings() {
    const { state, dispatch } = React.useContext(AuthContext)
    const [fundAprovers, setFundAprovers] = useState()
    const [notificationAutoDelete, setNotificationAutoDelete] = useState()
    let setIdleTimeDuration = idleTimeDuration => dispatch({ type: 'idleTimeDuration', payload: idleTimeDuration })
    function updateIdleTime(time) {
        axios.patch(`/settings/idleTime/${time}`)
            .then(response => {
                setIdleTimeDuration(response.data.data.idleTime)
            })
            .catch(error => {
                console.log(error.response)
            })
    }
    function updateFundAprovers(count) {
        axios.patch(`/settings/fundaprovers/${count}`)
            .then(response => {
                setFundAprovers(response.data.data.fundAprovers)
            })
            .catch(error => {
                console.log(error.response)
            })
    }
    function updateNotificationAutoDelete(time) {
        axios.patch(`/settings/notificationAutoDelete/${time}`)
            .then(response => {
                setNotificationAutoDelete(response.data.data.notificationAutoDelete)
            })
            .catch(error => {
                console.log(error.response)
            })
    }
    function fetchSettings() {
        axios.get('/settings')
            .then(response => {
                setIdleTimeDuration(response.data.data.find(a => a.name === 'idleTime' ? a : '').value)
                setFundAprovers(response.data.data.find(a => a.name === 'fundAprovers' ? a : '').value)
                setNotificationAutoDelete(response.data.data.find(a => a.name === 'notificationAutoDelete' ? a : '').value)
            })
            .catch(error => {
                console.log(error.response)
            })
    }

    useEffect(() => {
        fetchSettings()
    }, [])

    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        <div className="card shadow-sm">
                            <h3 className="pl-3 pt-3 pb-3 bg-secondary text-white ">GENERAL SETTINGS</h3>
                            <div className="card-body">
                                <form action="#">
                                    <div className="form-group border-bottom pb-2">
                                        <div className="row">
                                            <div className="col">
                                                <h4 className='font-weight-bold'>Number of fund aprovers</h4>
                                                <label>The total number of fund aprovers required to make the fund APROVED</label>
                                            </div>
                                            <div className="col-2 mt-3">
                                                <select className='form-control' value={fundAprovers} onChange={(e) => updateFundAprovers(e.target.value)}>
                                                    <option value={1}>1</option>
                                                    <option value={2}>2</option>
                                                    <option value={3}>3</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="form-group border-bottom">
                                    <div className="row">
                                        <div className="col">
                                            <h4 className='font-weight-bold'>Mode of Aproving funds</h4>
                                            <label>1. Fund aprovers aproves funds randomly</label><br />
                                            <label>2. Fund aprovers aproves funds in sequence</label>
                                        </div>
                                        <div className="col-2 mt-3">
                                            <select className='form-control'>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                            </select>
                                        </div>
                                    </div>
                                </div> */}
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col">
                                                <h4 className='font-weight-bold'>Idle time</h4>
                                                <label>The total time to remain idle before locking the system</label>
                                            </div>
                                            <div className="col-2 mt-3">
                                                <select className='form-control' value={state.idleTimeDuration} onChange={(e) => updateIdleTime(e.target.value)}>
                                                    <option value={1000 * 60 * 5}>5 Minutes</option>
                                                    <option value={1000 * 60 * 30}>30 Minutes</option>
                                                    <option value={1000 * 60 * 60}>1 Hr</option>
                                                    <option value={1000 * 60 * 60 * 5}>5 Hrs</option>
                                                    <option value={0} disabled>No Idle Time</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col">
                                                <h4 className='font-weight-bold'>Notification Auto Delete</h4>
                                                <label>The total waiting time before deleting old read notifications</label>
                                            </div>
                                            <div className="col-2 mt-3">
                                                <select className='form-control' value={notificationAutoDelete} onChange={(e) => updateNotificationAutoDelete(e.target.value)}>
                                                    <option value={1000 * 60 * 60 * 24}>1 Day</option>
                                                    <option value={1000 * 60 * 60 * 24 * 7}>7 Days</option>
                                                    <option value={1000 * 60 * 60 * 24 * 14}>14 Days</option>
                                                    <option value={1000 * 60 * 60 * 24 * 30}>30 Days</option>
                                                    <option value={0} disabled>Do not delete</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <ul className="list-group">
                                    <li className="list-group-item">
                                        Employee
                                        <div className="material-switch float-right">
                                            <input id="staff_module" type="checkbox" />
                                            <label for="staff_module" className="badge-success"></label>
                                        </div>
                                    </li>
                                </ul> */}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
