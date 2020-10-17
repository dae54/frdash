import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import URL from '../../../URL'
import { NavLink } from 'react-router-dom';

export default function Notifications() {
    const hist = useHistory()
    const [notifications, setNotifications] = useState([])
    const [notificationAutoDeleteTime, setNotificationAutoDeleteTime] = useState()

    async function fetchNotifications() {
        await axios.get(`${URL}/notifications`, {
        }).then(response => {
            setNotifications(response.data.data);
        }).catch(error => {
            console.log(error)
        })
    }
    async function handleDelete(row) {
        // console.log(row)
        const deleteReq = window.confirm(`are you sure you want to delete notification issued by ${row.createdBy.firstName + ' ' + row.createdBy.lastName}\n
        You wont be able to recover it later`)
        if (deleteReq) {
            console.log('here i am')
            await axios.delete(`${URL}/notifications/${row._id}`)
                .then(response => {
                    console.log(response)
                    let newNotificationList = notifications.filter((item) => {
                        if (item._id != row._id) {
                            return item
                        }
                    })
                    setNotifications(newNotificationList)
                })
        }
    }
    function fetchNotificationDeleteTime() {
        axios.get('/settings/notificationAutoDelete')
            .then(response => {
                setNotificationAutoDeleteTime(response.data.data.value)
                // console.log(response.data.data)
            })
            .catch(error => {
                console.log(error.response)
            })
    }

    useEffect(() => {
        fetchNotifications()
        fetchNotificationDeleteTime()
    }, [])

    return (
        <React.Fragment>
            <div className="row">
                <div className="alert alert-info alert-dismissible fade show ml-3" role="alert">
                    <div className='text-uppercase text-monospace'>Old read notifications will be deleted after <strong>{notificationAutoDeleteTime / (3600 * 24 * 1000)} days</strong></div>
                    <div className=''>You can change this in <NavLink to='settings/general' className='text-uppercase'>settings</NavLink></div>
                </div>
                <div className="col-sm-12">
                    <div className="card-box">
                        <div className="card-block">
                            <BootstrapTable data={notifications} dataField='requests' pagination hover version='4' search>
                                <TableHeaderColumn isKey dataField='_id' dataFormat={indexNum}>S/N #</TableHeaderColumn>
                                <TableHeaderColumn dataField='createdBy' dataFormat={cell => cell.firstName + " " + cell.lastName} filterFormatted dataSort={true}>Issued By</TableHeaderColumn>
                                <TableHeaderColumn thStyle={{}} dataField='recepient' dataFormat={cell => formatRecepient(cell)} >Recepient</TableHeaderColumn>
                                <TableHeaderColumn dataField='recepient' dataFormat={(cell, row) => formatStatus(cell, row)}>status</TableHeaderColumn>
                                <TableHeaderColumn dataField='action' dataFormat={(cell, row) => action(row)} filterFormatted>Action</TableHeaderColumn>
                            </BootstrapTable>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
    function indexNum(cell, row, enumObj, index) {
        return (<div>{index + 1}</div>)
    }
    function formatRecepient(cell) {
        return (
            cell.length === 1 ?
                <>{cell[0].recepientID.firstName + ' ' + cell[0].recepientID.lastName}</>
                :
                <ul className="list-group list-group-flush p-0">
                    {cell.map(item => {
                        return (
                            <li className="list-group-item">{item.recepientID.firstName + ' ' + item.recepientID.lastName}
                            </li>
                        )
                    })}
                </ul>
        )
    }
    function formatStatus(cell, row) {
        if (cell.length === 1) {
            return cell[0].status ?
                <span className="badge badge-pill badge-primary p-2"><i className='fa fa-history mr-1'></i> NOT READ</span>
                :
                <span className="badge badge-pill badge-success p-2"><i className='fa fa-check mr-1'></i> READ</span>
        } else {
            return (
                <ul className="list-group list-group-flush p-0">
                    {cell.map(item => {
                        console.log(item.status)
                        return (
                            <li className="list-group-item">
                                {item.status ?
                                    <span className="badge badge-pill badge-success p-2"><i className='fa fa-check mr-1'></i> READ</span>
                                    :
                                    <span className="badge badge-pill badge-primary p-2"><i className='fa fa-history mr-1'></i> NOT READ</span>
                                }
                            </li>
                        )
                    })}
                </ul>
            )
        }
    }
    function action(row) {
        return (
            <div className='row justify-content-center'>
                <span style={{ cursor: 'pointer' }} onClick={() => handleDelete(row)} className="badge badge-pill badge-warning p-2 text-light pr-1"><i className='fa fa-trash mr-1'></i> DELETE </span>
                <span style={{ cursor: 'pointer' }} onClick={() => hist.replace('request/profile', { requestId: row.requestId })} className="badge badge-pill badge-success p-2"><i className='fa fa-eye mr-1'></i> VIEW REQUEST</span>
            </div>
        )
    }
}
