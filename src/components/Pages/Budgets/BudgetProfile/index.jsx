import React, { useState, useEffect } from 'react'
import { NavLink, useHistory } from 'react-router-dom'

import BudgetInformation from './BudgetInformation'
import BudgetItems from './BudgetItems'
import BudgetDistribution from './BudgetDistributionDonut'
import RequestsTimeLine from './RequestsTimeLine'
import RequestLineChart from './RequestLineChart'
import EditBudget from '../EditBudget'
import DeleteBudget from './DeleteBudget'
import BudgetItemUsageStatus from './BudgetItemUsageStatus'
import RealocateBudget from './RealocateBudget'
import { AppContext } from '../../../services/AppContext'

export default function Index(props) {
    const { dispatch } = React.useContext(AppContext)
    let setBreadcrumbPath = path => dispatch({ type: 'breadcrumbPath', payload: path })

    useEffect(() => {
        setBreadcrumbPath([
            { name: 'Budgets', url: '/budgets' },
            { name: 'Profile' },
        ])
    }, [])

    const hist = useHistory()
    console.log(hist)
    const [requests, setRequests] = useState([])
    const [deleteBudget, setDeleteBudget] = useState(false)
    const [requestEditBudget, setRequestEditBudget] = useState(false)

    return (
        <React.Fragment>
            <div className="pb-3">
                <span className="h4">{props.location.state.name.toUpperCase()} PROFILE</span>
                <NavLink className="btn btn-primary btn-rounded float-right mt-n2" to={{ pathname: '/budgets' }}>
                    <i className="fa fa-eye"></i> VIEW ALL BUDGETS
                </NavLink>
            </div>
            {/* FIRST SECTION ROW*/}
            <div className="row">
                <div className="col-12 col-sm-10 col-md-6 -lg-none">
                    <BudgetInformation budget={props} setRequestEditBudget={setRequestEditBudget} setDeleteBudget={setDeleteBudget} />
                    {requestEditBudget &&
                        <EditBudget budget={props.location.state} setRequestEditBudget={setRequestEditBudget} />
                    }
                    {deleteBudget &&
                        <DeleteBudget budget={props.location.state} setDeleteBudget={setDeleteBudget} />
                    }
                    <RealocateBudget budget={props.location.state} />
                </div>
                <div className="col-12 col-sm-10 col-md-6 -lg-none" style={{ maxHeight: '52vh' }}>
                    <BudgetItems budget={props} />
                </div>
            </div>
            {/* SECOND SECTION ROWS */}
            <div className="row">
                <div className="col-12 col-sm-10 col-lg-8 col-xl-4">
                    <RequestsTimeLine budgetId={props.location.state._id} setRequests={setRequests} />
                </div>
                <div className="col-12 col-lg-12 col-xl-8">
                    <RequestLineChart requests={requests} />
                </div>
            </div>
            {/* THIRD SECTION ROWS */}
            <div className="row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-7">
                    <BudgetItemUsageStatus budgetId={props.location.state._id} />
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-5">
                    <BudgetDistribution items={props.location.state.budgetItems} />
                </div>
            </div>
            {/* FOURTH SECTION ROWS */}
            <div className="row">
                <div className="col">
                    <div className="card">
                        <div className="card-header">LOGS</div>
                        <div className="card-body">Coming soon</div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
