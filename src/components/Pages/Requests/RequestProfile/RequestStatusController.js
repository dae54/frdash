import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import StatusFormatter from '../../../Gadgets/StatusFormatter';

export default function RequestStatusController(props) {
    let request = props.request
    const hist = useHistory()
    // console.log(hist.location)
    // let request = hist.location.state
    const [isLoading, setIsLoading] = useState(false)
    const [action, setAction] = useState()
    const [statusChanged, setStatusChanged] = useState(false)

    async function handleStatusChange(status, remarks = '') {
        console.log(status, remarks)
        await axios.patch(`/requests/${request._id}/changeStatus/${status}`, {
            remarks
        })
            .then(response => {
                setStatusChanged(true)
                // request.status = response.data.data.status
                // request.remarks.push(response.data.data.remarks)
                console.log(response.data.data.request)
                request = response.data.data.request 
                hist.replace({ request })
            }).catch(error => {
                console.log(error.response)
            })
    }

    async function handleRequestAprove() {
        await axios.patch(`/requests/aprove/${request._id}`)
            .then(response => {
                console.log(response.data.data)
                request.status = response.data.data.status
                hist.replace({ state: request })
            }).catch(error => {
                console.log(error.response)
            })
    }
    useEffect(() => {
        setStatusChanged(false)
    }, [action, setStatusChanged])

    return (
        <React.Fragment>
            <div className="d-flex">
                <StatusFormatter status={request.status} />
                <RemarksController action={action} handleStatusChange={handleStatusChange} statusChanged={statusChanged} />

                {!isLoading &&
                    <>
                        {request.status === 0 && //Pending
                            <li className="dropdown has-arrow mt-n1" style={{ listStyleType: 'none' }}>
                                <span className="btn btn-sm btn-success ml-3 dropdown-toggle" data-toggle="dropdown">
                                    CHANGE STATUS
                                    </span>
                                <div className="dropdown-menu">
                                    {props.disburseAlert <= 1 &&
                                        <button className="btn btn-sm btn-success btn-block rounded-pill" onClick={handleRequestAprove} disabled={props.disburseAlert > 1}><i className='fa fa-check mr-1'></i> APROVE</button>
                                    }
                                    <button className="btn btn-sm btn-warning btn-block rounded-pill" data-toggle="modal" data-target="#remarksModal" onClick={() => setAction(1)}><i className='fa fa-history mr-1'></i> HOLD</button>
                                    <button className="btn btn-sm btn-dark btn-block rounded-pill" data-toggle="modal" data-target="#remarksModal" onClick={() => setAction(3)}><i className='fa fa-trash mr-1'></i> REJECT</button>
                                </div>
                            </li>
                        }
                        {request.status === 1 && //OnHold
                            <li className="dropdown has-arrow mt-n1" style={{ listStyleType: 'none' }}>
                                <span className="btn btn-sm btn-success ml-3 dropdown-toggle" data-toggle="dropdown">
                                    CHANGE STATUS
                                </span>
                                <div className="dropdown-menu">
                                    <span className="btn btn-sm btn-success btn-block rounded-pill" onClick={handleRequestAprove}><i className='fa fa-check mr-1'></i> APROVE</span>
                                    <span className="btn btn-sm btn-primary btn-block rounded-pill" onClick={() => handleStatusChange(0)}><i className='fa fa-check mr-1'></i> SET PENDING</span>
                                    <span className="btn btn-sm btn-dark btn-block rounded-pill" data-toggle="modal" data-target="#remarksModal" onClick={() => setAction(3)}><i className='fa fa-trash mr-1'></i> REJECT</span>
                                </div>
                            </li>
                        }
                        {request.status === 2 && //Approved
                            <li className="dropdown has-arrow mt-n1" style={{ listStyleType: 'none' }}>
                                <span className="btn btn-sm btn-success ml-3 dropdown-toggle" data-toggle="dropdown">
                                    CHANGE STATUS
                                </span>
                                <div className="dropdown-menu">
                                    <span className="btn btn-sm btn-success btn-block rounded-pill" onClick={() => handleStatusChange(4)}><i className='fa fa-check mr-1'></i> DISBURSE</span>
                                </div>
                            </li>
                        }
                        {request.status === 3 && //Rejected
                            <li className="dropdown has-arrow mt-n1" style={{ listStyleType: 'none' }}>
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
            </div>
        </React.Fragment >
    )

}


const RemarksController = ({ action, handleStatusChange, statusChanged }) => {
    const [remark, setRemark] = useState()
    function handleSubmit() {
        handleStatusChange(action, remark)
        setRemark('')
    }
    return (
        <div class="modal fade" id="remarksModal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Add Remarks</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    {statusChanged ?
                        <div class="modal-body text-center">
                            <p>Remark Saved and Status changed</p>
                            <button type="button" class="btn btn-secondary btn-sm mr-2" data-dismiss="modal" onClick={() => statusChanged = false}>Close</button>
                        </div>
                        :
                        <div class="modal-body">
                            <textarea type="text" className="form-control" rows='5' value={remark} onChange={(e) => setRemark(e.target.value)} style={{ resize: 'none' }} autoFocus={true}></textarea>
                            <hr />
                            <div class="float-right">
                                <button type="button" class="btn btn-primary btn-sm" onClick={handleSubmit}>Confirm </button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
