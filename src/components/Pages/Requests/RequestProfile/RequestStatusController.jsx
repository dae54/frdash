import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import StatusFormatter from '../../../Gadgets/StatusFormatter';
import { useAlert } from 'react-alert'
import { Modal, Button, Form } from 'react-bootstrap'
export default function RequestStatusController(props) {
    let { request, setRequest, setRefreshRemarks } = props
    const hist = useHistory()
    const [isLoading, setIsLoading] = useState(false)
    const [action, setAction] = useState()
    const [statusChanged, setStatusChanged] = useState(false)
    const [revertReason, setRevertReason] = useState('')
    const alert = useAlert()

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function handleStatusChange(status, remarks = '') {
        setIsLoading(true)
        console.log(status, remarks)
        await axios.patch(`/requests/${request._id}/changeStatus/${status}`, {
            remarks
        })
            .then(response => {
                setIsLoading(false)
                setStatusChanged(true)
                setRequest(response.data.data)
                setRefreshRemarks(true)
            }).catch(error => {
                setIsLoading(false)
                console.log(error.response)
            })
    }

    async function handleRequestAprove() {
        setIsLoading(true)
        await axios.patch(`/requests/aprove/${request._id}`)
            .then(response => {
                setIsLoading(false)
                console.log(response.data.data)
                request.status = response.data.data.status
                hist.replace({ state: request })
            }).catch(error => {
                setIsLoading(false)
                console.log(error.response)
            })
    }

    const [validated, setValidated] = useState(false);

    const revertRequest = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        setValidated(true);
        setIsLoading(true)
        await axios.patch(`/requests/revertAprove/${request._id}`, {
            remarks: revertReason
        }).then(response => {
            setRequest(response.data.data)
            setRefreshRemarks(true)
            setIsLoading(false)
            alert.success(response.data.message)
            handleClose()
        }).catch(error => {
            setIsLoading(false)
            // alert.error(error.response.userMessage)
            console.log(error.response)
        })
    };
    useEffect(() => {
        setStatusChanged(false)
    }, [action, setStatusChanged])

    return (
        <React.Fragment>
            <div className="d-flex">
                <StatusFormatter status={request.status} />
                <RemarksController action={action} handleStatusChange={handleStatusChange} statusChanged={statusChanged} />

                {isLoading ?
                    <button className="btn btn-info mt- ml-2" disabled>
                        <div>
                            <div className="spinner-border text-light spinner-border-sm">
                                <span className="sr-only">Please Wait...</span>
                            </div>&nbsp;Please Wait...
                        </div>
                    </button>
                    :
                    <>
                        {request.status === 0 && //IF REQUEST IS PENDING
                            <li className="dropdown has-arrow mt-n1" style={{ listStyleType: 'none' }}>
                                <span className="btn btn-sm btn-success ml-3 dropdown-toggle" data-toggle="dropdown">
                                    CHANGE STATUS
                                </span>
                                <div className="dropdown-menu">
                                    {/* {props.disburseAlert <= 1 &&  // IF  */}
                                    <button className="btn btn-sm btn-success btn-block rounded-pill" onClick={handleRequestAprove} disabled={props.disburseAlert > 1}><i className='fa fa-check mr-1'></i> APROVE</button>
                                    {/* } */}
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
                        {request.status === 4 && //Disbursed
                            <span className="badge badge-success rounded-sm pt-2 pb-2 pl-3 pr-3 ml-3" style={{ cursor: 'pointer' }} onClick={handleShow}>REVERT CHANGES</span>
                        }
                    </>
                }
            </div>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <span class="modal-title" id="exampleModalLabel">
                        <div>
                            <small>Revert Request</small>
                        </div>
                        <StatusFormatter status={4} /> <i className="fa fa-arrow-right"></i> <StatusFormatter status={0} />
                    </span>
                </Modal.Header>
                <Form noValidate validated={validated} onSubmit={revertRequest}>
                    <Modal.Body>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Tell us why you want to revert</Form.Label>
                            <Form.Group controlId="validationCustom04">
                                <Form.Control as="textarea" rows={3} style={{ resize: 'none' }} value={revertReason} onChange={(e) => setRevertReason(e.target.value)} required />
                                <Form.Control.Feedback type="invalid">
                                    Please provide description.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        {isLoading ?
                            <button className='btn btn-default btn-sm'>
                                <div className="spinner-border spinner-border-sm" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div> &nbsp; Reverting
                            </button>
                            :
                            <>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" type='submit'>
                                    Confirm Revert
                                </Button>
                            </>
                        }
                    </Modal.Footer>
                </Form>
            </Modal>
        </React.Fragment >
    )

}


const RemarksController = ({ action, handleStatusChange, statusChanged }) => {
    const [remark, setRemark] = useState()

    function handleSubmit(e) {
        e.preventDefault()
        handleStatusChange(action, remark)
        setRemark('')
    }
    // switch(action){
    //     case 1:
    //         setActionString('HOLD')
    // }
    return (
        <div class="modal fade" id="remarksModal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        {/* <h5 class="modal-title">Add Remarks</h5> */}
                        <h5 class="modal-title">
                            Change status to <StatusFormatter status={action} />
                        </h5>
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
                            <form onSubmit={(e) => handleSubmit(e)}>
                                <h5 class="modal-titl">
                                    {/* Change status to <StatusFormatter status={action} /> */}
                                Remarks
                                </h5>
                                <textarea type="text" placeholder='Type a remark' className="form-control" rows='5' value={remark} onChange={(e) => setRemark(e.target.value)} style={{ resize: 'none' }} autoFocus={true} required></textarea>
                                <hr />
                                <div class="float-right">
                                    <button type="submit" class="btn btn-primary btn-sm">Confirm </button>
                                </div>
                            </form>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
