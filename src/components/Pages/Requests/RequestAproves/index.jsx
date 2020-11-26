import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { sortArray } from '../../../AccessoryFunctions/helperfunctions'
import axios from 'axios'
import StatusFormatter from '../../../Gadgets/StatusFormatter'
import { AppContext } from '../../../services/AppContext'

export default function RequestAproves() {
    const { state, dispatch } = React.useContext(AppContext)
    let setBreadcrumbPath = path => dispatch({ type: 'breadcrumbPath', payload: path })

    useEffect(() => {
        setBreadcrumbPath([
            { name: 'Requests', url: '/requests' },
            { name: 'Aproves' },
        ])
    }, [])
    
    const hist = useHistory()
    const [requestAproves, setRequestsAproves] = useState({ loading: false, error: '', data: [] })

    async function fetchRequestsAproves() {
        setRequestsAproves({ loading: true, error: [], data: [] });

        await axios.get('/requests/aprove', {
        }).then(response => {
            // console.log(response.data.data)

            // let as = response.data.data.sort((a, b) => {
            //     let x = a['requestId']['_id']
            //     let y = b['requestId']['_id']
            //     return ((x < y) ? -1 : ((x > y) ? 1 : 0))
            // })
            const seriesMiddle = response.data.data.reduce((result, currentValue) => {
                // console.log(currentValue.requestId._id)
                // console.log(result)
                (result[currentValue['requestId']['_id']] = result[currentValue['requestId']['_id']] || []).push(currentValue)
                return result
            }, {})

            // let res = Object.keys(seriesMiddle).map(key=>[key,seriesMiddle[key]])
            // console.log(res)

            let res = Object.values(seriesMiddle)
            // console.log(res)

            setRequestsAproves({ loading: false, error: '', data: res });


        }).catch(err => {
            setRequestsAproves({ loading: true, error: err, data: [] });
            console.log(err)
        })
    }



    useEffect(() => {
        fetchRequestsAproves();
    }, [])

    return (
        <React.Fragment>
            <div className="row">
                <div className="col-sm-4 col-3">
                    <h4 className="page-title">Request Aproves</h4>
                </div>
                {/* <div className="col-sm-8 col-9 text-right m-b-20">
                </div> */}
            </div>
            <div className="row">
                <div className="col">
                    {requestAproves.loading &&
                        <div className="btn btn-default text-white  pl-5 pr-5 pt-3 pb-3">
                            <div className="spinner-border text-white spinner-border-sm"></div> Please Wait...
                        </div>
                    }
                    {requestAproves.error &&
                        <div className="alert alert-warning">
                            {requestAproves.error.toString()}
                        </div>
                    }
                    {requestAproves.data.length !== 0 &&

                        <div className="card">
                            <div className="card-header pb-0">
                                <h5>All Request Aproves</h5>
                            </div>
                            <div className="card-body">
                                {/* <div className="btn btn-default" onClick={fetchRequestsAproves}>click me</div> */}
                                <table className="table">
                                    <thead className='bg-ligh'>
                                        <tr>
                                            <th scope="col">Requester Name</th>
                                            {/* <th scope="col">Item Requested</th> */}
                                            {/* <th scope="col">Request At  Budget</th> */}
                                            <th scope="col">Request At</th>
                                            <th scope="col">Request Status</th>

                                            <th scope="col">Aprove #</th>
                                            <th scope="col">Aproved By</th>

                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {requestAproves.data.map(requestAprove => {
                                            return (
                                                <tr>
                                                    <td className='text-muted'>
                                                        <Link to={{ pathname: '/user/profile', state: requestAprove[0].userId._id }}>
                                                            {`${requestAprove[0].requestId.userId.firstName} ${requestAprove[0].requestId.userId.lastName} `}
                                                        </Link>
                                                    </td>
                                                    {/* <td className='text-muted'>{`${requestAprove[0].requestId.budgetItemId.name}(${requestAprove[0].requestId.budgetItemId.code})`}</td> */}
                                                    {/* <td className='text-muted'>{requestAprove[0].requestId.budgetId.name}</td> */}
                                                    <td className='text-muted'>{new Date(requestAprove[0].requestId.createdAt).toDateString()}</td>
                                                    <td><StatusFormatter status={requestAprove[0].requestId.status} /></td>
                                                    <td className='text-muted'>{requestAprove.length}</td>
                                                    <td className='text-muted'>
                                                        {requestAprove.map(req => {
                                                            return (
                                                                <tr className='p-0 table-borderless'>
                                                                    <td className='p-2'>
                                                                        <Link to={{ pathname: '/user/profile', state: req.userId._id }}>
                                                                            {`${req.userId.firstName} ${req.userId.lastName}`}
                                                                        </Link>
                                                                    </td>
                                                                    <td className='p-2'>
                                                                        {new Date(req.createdAt).toDateString()}
                                                                        {/* {req.createdAt} */}
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })}
                                                    </td>
                                                    <td className=''>
                                                        <Link
                                                            to={{
                                                                pathname: '../request/profile',
                                                                state: { requestId: requestAprove[0].requestId._id }
                                                            }}
                                                            className="badge badge-success rounded-sm pt-2 pb-2 pl-3 pr-3" style={{ cursor: 'pointer' }}>
                                                            VIEW REQUEST
                                                        </Link>
                                                        <span className='bg-warning p-1 ml-3 rounded-lg text-dark' onClick={() => alert('delete')}><i className="fa fa-trash">   </i></span>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    }
                    {requestAproves.data.length === 0 &&
                        <div className=''>
                            NO APROVED REQUESTS.
                        </div>
                    }
                </div>
            </div>
        </React.Fragment >
    )
}
