import React, { useState, useEffect } from 'react'

import InfoCard from '../../Gadgets/InfoCard'
import Statistics from './Request/Statistics';
import List from './Request/List';
import Distribution from './Budgets/Distribution';
import Reports from './Budgets/Reports'
import { AppContext } from '../../services/AppContext';
import axios from 'axios';

export default function Dashboard() {
    const { dispatch } = React.useContext(AppContext)
    let setBreadcrumbPath = path => dispatch({ type: 'breadcrumbPath', payload: path })



    const [dashboardStatistics, setDashboardStatistics] = useState({ loading: true, data: {} })

    async function fetchDashboardStatistics() {
        await axios.get('requests/dashboardStats')
            .then(({ data }) => {
                setDashboardStatistics({ loading: false, data: data.data })
            }).catch(error => {
                setDashboardStatistics({ loading: false, data: {} })
                console.log(error)
            })
    }

    useEffect(() => {
        setBreadcrumbPath([])
        fetchDashboardStatistics()
    }, [])
    const info = [
        {
            icon: 'user-o',
            label: 'Users',
            amount: dashboardStatistics.data.userCount,
            color: 'default'
        },
        {
            icon: 'dollar',
            label: 'Requests',
            amount: dashboardStatistics.data.requestCount,
            color: 'primary'
        },
        {
            icon: 'hourglass-end',
            label: 'Total Pending',
            amount: 'TSh ' + dashboardStatistics.data.pendingAmount,
            color: 'secondary'
        },
        {
            icon: 'leaf',
            label: 'Total Disbursed',
            amount: 'TSh ' + dashboardStatistics.data.disbursedAmount,
            color: 'success'
        },
    ]

    return (
        <React.Fragment>
            <div className="row">
                <div className="col-sm-4 col-3">
                    <h5 className="page-title text-dark">DASHBOARD</h5>
                </div>
            </div>
            <div className="row">
                {dashboardStatistics.loading ?
                    Array.from({ length: 4 }, (x, index) => {
                        return (
                            <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-3' key={index}>
                                <div className='jumbotron blink_me pt-5 pb-4'>
                                    <div className="spinner-border spinner-border-sm p-0" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    :
                    info.map((item, index) => {
                        return (
                            <div key={index} className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-3">
                                <div className={`dash-widget shadow border-left border-${item.color}`}>
                                    <span className={`dash-widget-bg1 bg-${item.color}`}><i className={`fa fa-${item.icon}`} aria-hidden="true"></i></span>
                                    <div className="dash-widget-info text-right">
                                        <h5 className='pb-2 font-weight-bold'>{item.amount.toLocaleString()}</h5>
                                        {item.label}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {/* START OF REQUEST SECTION */}
            <h3 className="card-title text-uppercase">Requests</h3>
            <div className="row">
                <div className="col-12 col-xl-7">
                    <Statistics />
                </div>
                <div className="col-12 col-md-9 col-xl-5">
                    <List />
                </div>
            </div>
            {/* END OF REQUEST SECTION */}

            {/* START OF BUDGET SECTION */}
            <h3 className="card-title text-uppercase">Budgets</h3>
            <div className="row">
                <div className="col-12 col-sm-12 col-xl-8  d-xl-non">
                    <Distribution />
                </div>
                <div className="col-12 col-sm-12 col-xl-4">
                    <Reports />
                </div>
            </div>
        </React.Fragment>
    )
}