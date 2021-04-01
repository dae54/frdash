import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

import BudgetInformation from './BudgetInformation'
import BudgetItems from './BudgetItems'
import BudgetDistribution from './BudgetDistributionDonut'
import RequestsTimeLine from './RequestsTimeLine'
import RequestLineChart from './RequestLineChart'
import EditBudget from '../EditBudget/EditBudget'
import DeleteBudget from './DeleteBudget'
import BudgetItemUsageStatus from './BudgetItemUsageStatus'
import RealocateBudget from './RealocateBudget'
import { AppContext } from '../../../services/AppContext'
import axios from 'axios'

export default function Index(props) {
    const { dispatch } = React.useContext(AppContext)
    let setBreadcrumbPath = path => dispatch({ type: 'breadcrumbPath', payload: path })

    const [budget, setBudget] = useState({ loading: true, data: {} })
    const [requests, setRequests] = useState([])
    const [deleteBudget, setDeleteBudget] = useState(false)
    const [requestEditBudget, setRequestEditBudget] = useState(false)

    async function fetchBudgetById() {
        await axios.get(`budgets/${props.location.state.budgetId}`)
            .then(({ data }) => {
                // console.log(data)
                setBudget({ loading: false, data: data.data })
            }).catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        props.location.state.budgetId ? fetchBudgetById() : setBudget({ loading: false, data: props.location.state })
        setBreadcrumbPath([
            { name: 'Budgets', url: '/budgets' },
            { name: 'Profile' },
        ])
    }, [])

    return (
        <React.Fragment>
            {budget.loading ?
                "loading"
                :
                <>
                    <div className="pb-3">
                        <span className="h4">{budget.data.name.toUpperCase()} PROFILE</span>
                        <NavLink className="btn btn-primary btn-rounded float-right mt-n2" to={{ pathname: '/budgets' }}>
                            <i className="fa fa-eye"></i> VIEW ALL BUDGETS
                        </NavLink>
                    </div>
                    {/* FIRST SECTION ROW*/}
                    <div className="row">
                        <div className="col-12 col-sm-10 col-md-6 -lg-none">
                            <BudgetInformation budget={budget.data} setBudget={setBudget} setRequestEditBudget={setRequestEditBudget} setDeleteBudget={setDeleteBudget} />
                            {requestEditBudget &&
                                <EditBudget budget={budget.data} setRequestEditBudget={setRequestEditBudget} />
                            }
                            {deleteBudget &&
                                <DeleteBudget budget={budget.data} setDeleteBudget={setDeleteBudget} />
                            }
                            <RealocateBudget budget={budget.data} />
                        </div>
                        <div className="col-12 col-sm-10 col-md-6 -lg-none" style={{ maxHeight: '52vh' }}>
                            <BudgetItems budgetItems={budget.data.budgetItems} />
                        </div>
                    </div>
                    {/* SECOND SECTION ROWS */}
                    <div className="row">
                        <div className="col-12 col-sm-10 col-lg-8 col-xl-4">
                            <RequestsTimeLine budgetId={budget.data._id} setRequests={setRequests} />
                        </div>
                        <div className="col-12 col-lg-12 col-xl-8">
                            <RequestLineChart requests={requests} />
                        </div>
                    </div>
                    {/* THIRD SECTION ROWS */}
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-7">
                            <BudgetItemUsageStatus budgetId={budget.data._id} />
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-5">
                            <BudgetDistribution items={budget.data.budgetItems} />
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
                </>
            }

        </React.Fragment>
    )
}
