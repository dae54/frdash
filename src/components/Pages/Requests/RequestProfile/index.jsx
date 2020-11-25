import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import moment from 'moment'
import { useAlert } from 'react-alert'
// import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

// import RequestInformation from './RequestInformation'
// import UserInformation from './UserInformation'
import BudgetInformation from './BudgetInformation'
// import DemoReqAttachment from './AddAttachments'
// import Attachments from './Attachments'
// import { setAvatar } from '../../../AccessoryFunctions/avatarGenerator';
import RequestStatusController from './RequestStatusController'
import Remarks from './Remarks'
import { AppContext } from '../../../services/AppContext'
// import StatusFormatter from '../../../Gadgets/StatusFormatter'

export default function RequestProfile(props) {
    const { state, dispatch } = React.useContext(AppContext)
    let setBreadcrumbPath = path => dispatch({ type: 'breadcrumbPath', payload: path })

    useEffect(() => {
        setBreadcrumbPath([
            { name: 'Requests', url: '/requests' },
            { name: 'Profile' },
        ])
    }, [])

    const hist = useHistory();
    const alert = useAlert();
    const [request, setRequest] = useState()
    const [disburseAlert, setDisburseAlert] = useState('')
    const [refreshRemarks, setRefreshRemarks] = useState(false)

    async function fetchRequestById() {
        await axios.get(`/requests/${props.location.state.requestId}`, {
        }).then(response => {
            setRequest(response.data.data)
        }).catch(error => {
            console.log(error.response)
        })
    }

    const deleteRequest = async () => {
        let confirmDelete = window.confirm('You are about to delete a request, Bare in mind that its an irreversible action. Proceed with care')
        if (confirmDelete) {
            await axios.delete(`requests/${request._id}`)
                .then(res => {
                    console.log(res)
                    alert.success(res.data.message)
                    hist.goBack()
                }).catch(error => {
                    console.log(error)
                    alert(error)
                })
        }
    }

    useEffect(() => {
        props.location.state.requestId ? fetchRequestById() : setRequest(props.location.state)
    }, [])

    return (
        <React.Fragment>
            <div className="row">
                <div className="col-sm-4 col-3">
                    <h4 className="page-title">Request Profile</h4>
                </div>
                <div className="col-sm-8 col-9 text-right m-b-20">
                    {/* <Link className="btn btn-default btn-rounded float-right" to={{ pathname: '/requests' }}>
                        <i className="fa fa-trash "></i> DELETE REQUEST
                        <i className="fa fa-eye "></i> VIEW ALL REQUESTS
                    </Link> */}
                    <span className="btn btn-default btn-rounded float-right" onClick={deleteRequest}>
                        <i className="fa fa-trash "></i> DELETE REQUEST
                    </span>
                </div>
            </div>
            {request &&
                <div className="row row-cols-2">
                    <div className="col-12 col-md-6">
                        <div className="row row-cols-1">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header pb-2">
                                        <span className='text-dark h4'>Request Information</span>
                                        {/* <span className="bt btn-secondar p-1 pull-right" style={{ cursor: 'pointer' }} onClick={deleteRequest}>
                                            <i className="fa fa-trash"></i>
                                        </span> */}
                                    </div>
                                    <div className="card-body pt-0">
                                        <p className="text-monospace">
                                            <Link to={{ pathname: '../../user/profile', state: request.userId._id }} className="text-inf h5">${request.userId.firstName + ' ' + request.userId.lastName}</Link>&nbsp;
                                            requested {request.amount.toLocaleString()}
                                            Tsh from <span className='text-info h5' style={{ cursor: 'pointer' }}>${request.budgetItemId.name}</span></p>
                                        <p className='text-dark pt-2 pb-2' styl={{ height: '12vh' }}>Reasons: {request.description}
                                        </p>
                                        <p className="text-monospace">{moment(request.createdAt).format('DD/MM/YYYY HH:MM a').toUpperCase()} &nbsp; {moment(request.createdAt).fromNow()}</p>
                                        <hr />
                                        <RequestStatusController
                                            request={request}
                                            disburseAlert={disburseAlert}
                                            setRequest={setRequest}
                                            // refreshRemarks={refreshRemarks}
                                            setRefreshRemarks={setRefreshRemarks}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <Remarks
                                    requestId={request._id}
                                    refreshRemarks={refreshRemarks}
                                    setRefreshRemarks={setRefreshRemarks}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <BudgetInformation
                            budgetItem={request.budgetItemId}
                            budgetId={request.budgetId}
                            request={request}
                            setDisburseAlert={setDisburseAlert}
                            disburseAlert={disburseAlert}
                        />
                    </div>
                </div>
                ////////////////////////////////////////////////
                // <div className="row">
                //     <div className="col-5 pl-0">
                //         <div className="card">
                //             <div className="card-body">
                //                 <h3 class="product-title mb-0 text-uppercase d-flex w-50 pt-2 pl-2 pb-1" onClick={viewUser}>
                //                     <div className="mt-n1">
                //                         <span className='avatar bg-info' style={{ fontSize: '3vh' }} >{setAvatar(request.userId.firstName, request.userId.lastName)}</span>
                //                     </div>
                //                     {request.userId.firstName + ' ' + request.userId.lastName}
                //                 </h3>
                //                 <div className="row">
                //                     {/* <div class="col-xl-9 col-lg-8 col-md-12"> */}
                //                     <div class="col">
                //                         <p class="mt-2">Requested <span class="text-info">{request.amount}/=</span> from <span className='text-info'>${request.budgetItemId.name}</span> item</p>
                //                         <h5 className='text-dark'>Reasons</h5>
                //                         <p class="product-description">{request.description}</p>
                //                         {moment(request.createdAt).format('DD/MM/YYYY HH:MM a').toUpperCase()}
                //                             &nbsp; ({moment(request.createdAt).fromNow()})
                //                             <div class="action mt-2">
                //                             <RequestStatusController request={request} disburseAlert={disburseAlert} />
                //                         </div>
                //                         <hr />
                //                         <h5 className='mt-1 text-dark'>Remarks</h5>
                //                         {disburseAlert > 1 &&
                //                             <span className="bg-danger p-2 text-white">CAN'T BE DISBURSED</span>
                //                         }
                //                         {disburseAlert > 0.8 && disburseAlert <= 1 &&
                //                             <span className="bg-warning p-2 text-white">NOT SAFE TO DISBURSE</span>
                //                         }
                //                         {disburseAlert < 0.8 &&
                //                             <span className="bg-success p-2 text-white">SAFE TO DISBURSE</span>
                //                         }
                //                     </div>
                //                 </div>
                //             </div>
                //         </div>
                //     </div>
                //     <div className="col-6 border">
                //         <div className="jumbotron"></div>
                //     </div>

                //     <div className="row">
                //         <div className="col-6" style={{ height: '50vh', overflowY: '' }}>
                //             <div className="card">
                //                 <div className="card-header">
                //                     <b>Remarks</b>
                //                 </div>
                //                 <div className="card-body">
                //                     <div class="list-group list-group-flus">
                //                         {request.remarks.map(remark => {
                //                             console.log(remark)
                //                             return (
                //                                 <a class="list-group-item list-group-item-action d-flex justify-content-between align-items-center pb-0 pt-1">
                //                                     <span className=''>
                //                                         <span className='text-muted d-flex'>
                //                                             <b>{remark.createdBy}</b>
                //                                             &nbsp; Changed status to &nbsp;<StatusFormatter status={remark.statusSet} />
                //                                         </span>
                //                                         <span className=''>
                //                                             <b>Comments: &nbsp;</b>
                //                                             {remark.message}
                //                                         </span>

                //                                     </span>
                //                                     {/* <span class=""><StatusFormatter status={remark.statusSet}/></span> */}
                //                                     <span class="badge badge-info badge-pil m-0">{moment(remark.createdAt).fromNow()}</span>
                //                                 </a>
                //                             )
                //                         })}
                //                     </div>
                //                     {/* {request.remarks.map(remark => {
                //                         return (

                //                             <p class="product-description bg-light">
                //                                 <span>{remark.message}</span>
                //                                 <span>{remark.createdBy}</span>
                //                                 <span>{remark.createdAt}</span>
                //                             </p>
                //                         )
                //                     })} */}
                //                 </div>
                //             </div>
                //         </div>
                //         <div className="col-6">
                //             <BudgetInformation budgetItem={request.budgetItemId} budgetId={request.budgetId} requestedAmount={request.amount} setDisburseAlert={setDisburseAlert} />
                //         </div>
                //     </div>

                //     {/* <div className="row"> */}
                //     {/* <div className="col-6">
                //             <RequestInformation request={request} />
                //         </div> */}
                //     {/* <div className="col-6"> */}
                // {/* <BudgetInformation budgetItem={request.budgetItemId} budgetId={request.budgetId} requestedAmount={request.amount} setDisburseAlert={setDisburseAlert} /> */}
                //     {/* </div> */}
                //     {/* </div> */}

                //     <div className="row">
                //         {/* <div className="col-6">
                //             <UserInformation userId={request.userId} />
                //         </div> */}
                //         <div className="col-6">
                //             <div className="container-fluid p-0">
                //                 <Attachments requestId={request._id} attachments={request.attachments} />
                //             </div>
                //         </div>
                //         {/* <div className="col-6">
                //             <div className="container-fluid p-0">
                //                 <DemoReqAttachment requestId={request._id} />
                //             </div>
                //         </div> */}
                //     </div>

                //     {/* <div className="col-6">
                //         <RequestInformation request={request} />
                //         <UserInformation userId={request.userId} />
                //     </div> */}
                //     {/* <div className="col-6">
                //         <BudgetInformation budgetItem={request.budgetItemId} budgetId={request.budgetId} requestedAmount={request.amount} />
                //         <div className="container-fluid p-0">
                //             <Attachments requestId={request._id} attachments={request.attachments} />
                //         </div>
                //         <div className="container-fluid p-0">
                //             <DemoReqAttachment requestId={request._id} />
                //         </div>
                //     </div> */}
                // </div>
            }
        </React.Fragment>
    )
}
// 180