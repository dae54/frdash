import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

// import InfoCard from '../../Gadgets/InfoCard'
import RequestDataTable from './RequestDataTable'
import Statistics from './Statistics'
import { AppContext } from '../../services/AppContext'

export default function Requests() {
    const { dispatch } = React.useContext(AppContext)
    let setBreadcrumbPath = path => dispatch({ type: 'breadcrumbPath', payload: path })

    useEffect(() => {
        setBreadcrumbPath([
            { name: 'All Requests', url: '/requests' },
        ])
    }, [])

    const [requestStats, setRequestStats] = useState({ loading: true, data: {} })
    const [requests, setRequests] = useState({ loading: true, data: [] })
    // const [requestsLoaded, setRequestsLoaded] = useState(false)

    async function fetchRequestStats() {
        await axios.get(`${URL}/requests/stats/`, {
        }).then(response => {
            // console.log('response.data.data');
            setRequestStats({ loading: false, data: response.data.data });
        }).catch(error => {
            setRequestStats({ loading: false, data: {} });
            console.log(error)
        })
    }
    async function fetchRequests() {
        await axios.get('/requests', {
        }).then(response => {
            setRequests({ loading: false, data: response.data.data });
            // setRequestsLoaded(true);
        }).catch(error => {
            setRequests({ loading: false, data: [] });
            console.log(error)
        })
    }

    useEffect(() => {
        fetchRequestStats();
        fetchRequests();
    }, [])
    return (
        <React.Fragment>
            <div className="row">
                <div className="col-sm-4 col-3">
                    <h4 className="page-title">Requests</h4>
                </div>
                <div className="col-sm-8 col-9 text-right m-b-20">
                    <NavLink className="btn btn-primary btn-rounded float-right" to={{ pathname: 'request/create' }}>
                        <i className="fa fa-plus"></i> Create Request
                    </NavLink>
                </div>
            </div>
            <div className="row">
                {requestStats.loading ?
                    Array.from({ length: 3 }, (x, index) => {
                        return (
                            <div className='col-3' key={index}>
                                <div className='jumbotron blink_me pt-5 pb-4'>
                                    <div className="spinner-border spinner-border-sm p-0" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    :
                    <Statistics statistics={requestStats.data} />
                }
            </div>
            <div className='row'>
                {requests.loading ?
                    <p>
                        <div className="spinner-border spinner-border-sm" role="status">
                            <span className="sr-only">Loading...</span>
                        </div> &nbsp; Contacting server. Please wait
                    </p>
                    :
                    <RequestDataTable requests={requests.data} />
                }
            </div>
        </React.Fragment>
    )
}
