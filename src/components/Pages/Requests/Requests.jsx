import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

// import InfoCard from '../../Gadgets/InfoCard'
import RequestDataTable from './RequestDataTable'
import Statistics from './Statistics'
import { AppContext } from '../../services/AppContext'

export default function Requests() {
    const { state, dispatch } = React.useContext(AppContext)
    let setBreadcrumbPath = path => dispatch({ type: 'breadcrumbPath', payload: path })

    useEffect(() => {
        setBreadcrumbPath([
            { name: 'All Requests', url: '/requests' },
        ])
    }, [])
    
    const [requestStats, setRequestStats] = useState({})
    const [requests, setRequests] = useState({})
    const [requestsLoaded, setRequestsLoaded] = useState(false)

    async function fetchRequestStats() {
        await axios.get(`${URL}/requests/stats/`, {
        }).then(response => {
            // console.log('response.data.data');
            setRequestStats(response.data.data);
        }).catch(error => {
            console.log(error)
        })
    }
    async function fetchRequests() {
        await axios.get('/requests', {
        }).then(response => {
            setRequests(response.data.data);
            setRequestsLoaded(true);
        }).catch(error => {
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
                {requestStats.pendingRequests &&
                    <Statistics stats={requestStats} />
                }
            </div>
            <div className='row'>
                {requestsLoaded &&
                    <RequestDataTable requests={requests} />
                }
                {/* {!requestsLoaded &&
                
                } */}
            </div>
        </React.Fragment>
    )
}
