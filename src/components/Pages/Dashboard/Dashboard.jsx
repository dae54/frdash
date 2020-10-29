import React, { useState, useEffect } from 'react'

import InfoCard from '../../Gadgets/InfoCard'
import Statistics from './Request/Statistics';
import List from './Request/List';
import Distribution from './Budgets/Distribution';
import Reports from './Budgets/Reports'
import { AppContext } from '../../services/AppContext';

export default function Dashboard() {
    const { dispatch } = React.useContext(AppContext)
    let setBreadcrumbPath = path => dispatch({ type: 'breadcrumbPath', payload: path })

    useEffect(() => {
        setBreadcrumbPath([])
    }, [])

    const info = [
        {
            icon: 'stethoscope',
            label: 'Users',
            amount: 99,
            color: 'primary'
        },
        {
            icon: 'user-o',
            label: 'Requests',
            amount: "1074Tsh",
            color: 'success'
        },
        {
            icon: 'user-md',
            label: 'Total Requests',
            amount: 77,
            color: 'secondary'
        },
        {
            icon: 'heartbeat',
            label: 'Pending',
            amount: 41,
            color: 'warning'
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
                {info.map((item, index) => {
                    return (<InfoCard key={index} item={item} />)
                })}
            </div>
            {/* START OF REQUEST SECTION */}
            <h3 className="card-title text-uppercase">Requests</h3>
            <div className="row">
                <div className="col-8">
                    <Statistics />
                </div>
                <div className="col-4">
                    <List />
                </div>
            </div>
            {/* END OF REQUEST SECTION */}

            {/* START OF BUDGET SECTION */}
            <h3 className="card-title text-uppercase">Budgets</h3>
            <div className="row">
                <div className="col-6">
                    <Distribution />
                </div>
                <div className="col-5">
                    <Reports />
                </div>
            </div>
        </React.Fragment>
    )
}