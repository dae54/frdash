import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import StatusFormatter from '../../../Gadgets/StatusFormatter';
import URL from '../../../../URL'

export default function RequestInformation(props) {
    console.log(props.request)
    let request = props.request
    const hist = useHistory()
    // const [status, setStatus] = useState(props.request.status)
    // let request = hist.location.state
    console.log(request)
    const [isLoading, setIsLoading] = useState(false)

    async function handleStatusChange(status) {
        // console.log('object')
        await axios.patch(`${URL}/requests/${request._id}/changeStatus/${status}`)
            .then(response => {
                request.status = response.data.data.status
                hist.replace({ state: request })
                // setStatus(response.data.data.status)
                // console.log(response)
            }).catch(error => {
                console.log(error.response)
            })
    }
    async function handleRequestAprove() {
        await axios.patch(`${URL}/requests/aprove/${request._id}`)
            .then(response => {
                console.log(response.data.data)
                request.status = response.data.data.status
                hist.replace({ state: request })
            }).catch(error => {
                console.log(error.response)
            })
    }
    return (
        <React.Fragment>
            <div className="card pb-3">
                <div className="card-header text-uppercase">Request Information</div>
                <div className="card-body">
                    <table className="table table-borderless shadow-none border-0">
                        <tbody >
                            <tr>
                                <td>ITEM NAME</td>
                                <td>{request.budgetItemId.name}</td>
                            </tr>
                            <tr>
                                <td>CODE</td>
                                <td>{request.budgetItemId.code}</td>
                            </tr>
                            <tr>
                                <td>AMOUNT</td>
                                <td>{request.amount}</td>
                            </tr>
                            <tr>
                                <td>DESCRIPTION</td>
                                <td>{request.description}</td>
                            </tr>
                            <tr>
                                <td>DATE ISSUED</td>
                                <td>{request.createdAt}</td>
                            </tr>
                            <tr>
                                <td>STATUS</td>
                                <tr>
                                    <td><StatusFormatter status={request.status} /></td>
                                    {!isLoading &&
                                        <>
                                            {request.status === 0 &&
                                                <li className="dropdown has-arrow mt-2" style={{ listStyleType: 'none' }}>
                                                    <span className="btn btn-sm btn-success ml-3 dropdown-toggle" data-toggle="dropdown">
                                                        CHANGE STATUS
                                                    </span>
                                                    <div className="dropdown-menu">
                                                        <span className="btn btn-sm btn-success btn-block rounded-pill" onClick={handleRequestAprove}><i className='fa fa-check mr-1'></i> APROVE</span>
                                                        <span className="btn btn-sm btn-warning btn-block rounded-pill" onClick={() => handleStatusChange(1)}><i className='fa fa-history mr-1'></i> HOLD</span>
                                                        <span className="btn btn-sm btn-dark btn-block rounded-pill" onClick={() => handleStatusChange(3)}><i className='fa fa-trash mr-1'></i> REJECT</span>
                                                    </div>
                                                </li>
                                            }
                                            {request.status === 1 &&
                                                <li className="dropdown has-arrow mt-2" style={{ listStyleType: 'none' }}>
                                                    <span className="btn btn-sm btn-success ml-3 dropdown-toggle" data-toggle="dropdown">
                                                        CHANGE STATUS
                                                    </span>
                                                    <div className="dropdown-menu">
                                                        <span className="btn btn-sm btn-success btn-block rounded-pill" onClick={handleRequestAprove}><i className='fa fa-check mr-1'></i> APROVE</span>
                                                        <span className="btn btn-sm btn-primary btn-block rounded-pill" onClick={() => handleStatusChange(0)}><i className='fa fa-check mr-1'></i> SET PENDING</span>
                                                        <span className="btn btn-sm btn-dark btn-block rounded-pill" onClick={() => handleStatusChange(3)}><i className='fa fa-trash mr-1'></i> REJECT</span>
                                                    </div>
                                                </li>
                                            }
                                            {request.status === 2 &&
                                                <li className="dropdown has-arrow mt-2" style={{ listStyleType: 'none' }}>
                                                    <span className="btn btn-sm btn-success ml-3 dropdown-toggle" data-toggle="dropdown">
                                                        CHANGE STATUS
                                                    </span>
                                                    <div className="dropdown-menu">
                                                        <span className="btn btn-sm btn-success btn-block rounded-pill" onClick={() => handleStatusChange(4)}><i className='fa fa-check mr-1'></i> DISBURSE</span>
                                                    </div>
                                                </li>
                                            }
                                            {request.status === 3 &&
                                                <li className="dropdown has-arrow mt-2" style={{ listStyleType: 'none' }}>
                                                    <span className="btn btn-sm btn-success ml-3 dropdown-toggle" data-toggle="dropdown">
                                                        CHANGE STATUS
                                                    </span>
                                                    <div className="dropdown-menu">
                                                        <span className="btn btn-sm btn-success btn-block rounded-pill" onClick={() => handleStatusChange(0)}><i className='fa fa-check mr-1'></i> RESTORE</span>
                                                    </div>
                                                </li>
                                            }
                                        </>
                                    }
                                    {isLoading &&
                                        <div className="dash-widget-info">
                                            <button className="widget-title1 btn btn-info mt-2 ml-5" disabled>
                                                <div>
                                                    <div className="spinner-border text-light spinner-border-sm " role="status">
                                                        <span className="sr-only">Please Wait...</span>
                                                    </div>
                                                        &nbsp;Please Wait...
                                                    </div>
                                            </button>
                                        </div>
                                        // <span className="btn btn-sm btn-warning btn-block rounded-pill mt-2 ml-4"><i className='fa fa-trash mr-1'></i> DELETE</span>
                                    }
                                </tr>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </React.Fragment >
    )
}
