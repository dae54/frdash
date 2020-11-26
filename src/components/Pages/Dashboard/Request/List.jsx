import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import { Link } from 'react-router-dom'

import StatusFormatter from '../../../Gadgets/StatusFormatter'

export default function List() {
    const [requests, setRequests] = useState({ loading: false, data: [] })
    const [requestStatusOnFocus, setRequestStatusOnFocus] = useState({ value: 'Pending', id: '0' })

    async function fetchRequests() {
        setRequests({ loading: true, data: [] })
        await axios.get('requests', {
            params: {
                select: ['userId', 'createdAt', 'status', 'amount'],
                identifier: 'status',
                value: requestStatusOnFocus.id,
                limit: 6
            }
        }).then(response => {
            // console.log(response.data.data)
            setRequests({ loading: false, data: response.data.data })
        }).catch(error => {
            setRequests({ loading: false, data: [] })
            console.log(error.response)
        })
    }

    function handleRequestStatusChange(e) {
        setRequestStatusOnFocus({ value: e.target.innerText, id: e.target.id })
    }
    // function handleViewRequest(e){
    //     console.log(e.target.id)
    // }

    useEffect(() => {
        /**
         * THIS CALLS @function fetchRequests() WHENEVER @param requestStatusOnFocus CHANGES. 
         */
        fetchRequests()
    }, [requestStatusOnFocus])

    return (
        <React.Fragment>
            <div className="card-box pl-0 pr-0 pb-0" style={{ maxHeight: '393px' }}>
                <span className='d-inline-block pl-3'>
                    <h3 className="card-title text-muted pl-3">{requestStatusOnFocus.value} Requests</h3>
                </span>
                <span className="d-inline-block float-right pr-3">
                    <div className="btn-group float-right pr-3">
                        <button className="btn btn-white shadow-sm rounded-lg pb-0 pt-0 btn-sm dropdown-toggle text-muted"
                            type="button" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                            {/* // style={{ cursor: 'not-allowed' }} */}
                            {requestStatusOnFocus.value} &nbsp;&nbsp;
                        </button>
                        <div className="dropdown-menu" style={{ maxHeight: '30vh', overflowY: 'auto' }}>
                            <span style={{ cursor: 'pointer' }} className="dropdown-item pt-0 pb-1" id="0" onClick={handleRequestStatusChange}>Pending</span>
                            <span style={{ cursor: 'pointer' }} className="dropdown-item pt-0 pb-1" id="1" onClick={handleRequestStatusChange}>Held</span>
                            <span style={{ cursor: 'pointer' }} className="dropdown-item pt-0 pb-1" id="2" onClick={handleRequestStatusChange}>Aproved</span>
                            <span style={{ cursor: 'pointer' }} className="dropdown-item pt-0 pb-1" id="3" onClick={handleRequestStatusChange}>Rejected</span>
                            <span style={{ cursor: 'pointer' }} className="dropdown-item pt-0 pb-1" id="4" onClick={handleRequestStatusChange}>Disbursed</span>
                            <span style={{ cursor: 'pointer' }} className="dropdown-item pt-0 pb-1" id="5" onClick={handleRequestStatusChange}>Confirmed</span>
                            <span style={{ cursor: 'pointer' }} className="dropdown-item pt-0 pb-1" id="6" onClick={handleRequestStatusChange}>Cancelled</span>
                        </div>
                    </div>
                </span>
                <div className="card-body pb-1 mt-n2" style={{ height: requests.data.length ? '310px' : '' }}>
                    {requests.loading ?
                        <p>
                            <div className="spinner-border spinner-border-sm" role="status">
                                <span className="sr-only">Loading...</span>
                            </div> &nbsp; Contacting server. Please wait
                        </p>
                        :
                        requests.data.length ?
                            <table className="table table-s table-borderless border-0 table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">USER</th>
                                        <th scope="col">AMOUNT</th>
                                        <th scope="col">REQUEST DATE</th>
                                        {/* <th scope="col">STATUS</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {requests.data.map(request => {
                                        return (
                                            <tr>
                                                <td>{`${request.userId.firstName} ${request.userId.lastName}`}</td>
                                                <td>{request.amount.toLocaleString()}</td>
                                                <td>{moment(request.createdAt).format('MMM DD, YYYY')}</td>
                                                <td>
                                                    <Link to={{ pathname: '/request/profile', state: { requestId: request._id } }}>
                                                        <i className="fa fa-eye"></i>
                                                    </Link>
                                                </td>
                                                {/* <td className='pt-1'><StatusFormatter status={request.status} /></td> */}
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            :
                            <h5 className="card-title text-mute">No data to show.</h5>
                    }
                </div>
                {requests.data.length !== 0 &&
                    <div className="card-footer text-center bg-transparent mt-n3">
                        <Link to='/requests'>
                            See More
                        </Link>
                    </div>
                }
            </div>
        </React.Fragment>
    )
}
