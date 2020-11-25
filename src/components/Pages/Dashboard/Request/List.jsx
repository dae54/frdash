import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import { Link } from 'react-router-dom'

import StatusFormatter from '../../../Gadgets/StatusFormatter'

export default function List() {
    const [requests, setRequests] = useState({ loading: true, data: [] })
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
            setRequests({ loading: false, data: response.data.data })
        }).catch(error => {
            setRequests({ loading: false, data: [] })
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
            <div className="card-box pl-0 pr-0 pb-0" style={{ maxHeight: '393px' }}>
                <span className='d-inline-block pl-3'>
                    <h3 className="card-title text-muted pl-3">Pending Requests</h3>
                </span>
                <span className="d-inline-block float-right pr-3">
                    <div className="btn-group float-right pr-3">
                        <button className="btn btn-white shadow-sm rounded-lg pb-0 pt-0 btn-sm dropdown-toggle text-muted"
                            type="button" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false"
                            style={{ cursor: 'not-allowed' }}>Test Budget &nbsp;&nbsp;
                        </button>
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
