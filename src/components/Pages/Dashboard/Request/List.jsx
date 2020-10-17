import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import { Link } from 'react-router-dom'

import StatusFormatter from '../../../Gadgets/StatusFormatter'

export default function List() {
    const [requests, setRequests] = useState([])
    async function fetchRequests() {
        await axios.get('requests', {
            params: {
                select: ['userId', 'createdAt', 'status', 'amount'],
                identifier: 'status',
                value: 0,
                limit: 6
            }
        }).then(response => {
            // console.log(response.data.data)
            setRequests(response.data.data)
        }).catch(error => {
            console.log(error.response)
        })
    }

    useEffect(() => {
        fetchRequests()
        return () => {
            console.log('exiting')
        }
    }, [])

    return (
        <React.Fragment>
            <div className="card-box shadow pl-0 pr-0 pb-0" style={{ maxHeight: '393px' }}>
                <span className='d-inline-block pl-3'>
                    <h3 className="card-title text-muted">Pending Requests</h3>
                </span>
                <span className="d-inline-block float-right pr-3">
                    <div className="btn-group float-right pr-3">
                        <button className="btn btn-white shadow-sm rounded-lg pb-0 pt-0 btn-sm dropdown-toggle text-muted"
                            type="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            style={{ cursor: 'not-allowed' }}>
                            Test Budget &nbsp;&nbsp;
                            </button>
                        {/* <div className="dropdown-menu">
                                <a className="dropdown-item" href="#">June 20 - August 20</a>
                                <a className="dropdown-item" href="#">Another action</a>
                                <a className="dropdown-item" href="#">Something else here</a>
                            </div> */}
                    </div>
                </span>
                <div className="card-body p-0 mt-n2">
                    {requests.length ?
                        <table className="table table-s table-borderless border-0 table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">USER</th>
                                    <th scope="col">AMOUNT</th>
                                    <th scope="col">REQUEST DATE</th>
                                    <th scope="col">STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.map(request => {
                                    return (
                                        <tr>
                                            <td>{`${request.userId.firstName} ${request.userId.lastName}`}</td>
                                            <td>{request.amount}</td>
                                            <td>{moment(request.createdAt).format('MMM DD, YYYY')}</td>
                                            <td className='pt-1'><StatusFormatter status={request.status} /></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        :
                        <div className='jumbotron bg-light text-center h4 mb-0'>Sorry No Pending Requests</div>
                    }
                </div>
                <div className="card-footer text-center bg-light mt-n3">
                    <Link to='/requests' className="card-footer text-center bg-transparent">
                        See More
                    </Link>
                </div>
            </div>
        </React.Fragment>
    )
}
