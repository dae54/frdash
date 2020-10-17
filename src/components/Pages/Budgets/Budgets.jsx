import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import InfoCard from '../../Gadgets/InfoCard'
import BudgetDataTable from './BudgetDatatable'
import Statistics from './Statistics'
import URL from '../../../URL'


export default function Budgets() {
    // const [budgetStats, setBudgetStats] = useState([])
    const [budgets, setBudgets] = useState([])
    const [activeBudget, setActiveBudget] = useState()
    const [budgetsLoaded, setBudgetsLoaded] = useState(false)
    async function fetchBudgetStats() {

    }
    async function fetchBudgets() {
        await axios.get(`${URL}/budgets`, {
        }).then(response => {
            // console.log(response.data.data)
            setBudgets(response.data.data)
            setBudgetsLoaded(true)
        }).catch(error => {
            console.log(error)
        })
    }
    useEffect(() => {
        fetchBudgetStats();
        fetchBudgets();
    }, [])

    useEffect(() => {
        setActiveBudget(budgets.filter(budget => budget.status === 1).pop())
    }, [budgets])

    return (
        <React.Fragment>
            <div className="row">
                <div className="col-sm-4 col-3">
                    <h4 className="page-title">Budgets</h4>
                </div>
                <div className="col-sm-8 col-9 text-right m-b-20">
                    <NavLink className="btn btn-primary btn-rounded float-right" to={{ pathname: 'budgets/create' }}>
                        <i className="fa fa-plus"></i> Add Budget
                    </NavLink>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12 col-lg-8">
                    {budgets.length ?
                        <BudgetDataTable budgets={budgets} />
                        :
                        <div className="alert alert-warning alert-dismissible fade show" role="alert">
                            <strong>Sorry!</strong> No budget available.
                        <NavLink to='/budgets/create'> Consider creating new budget</NavLink>
                        </div>
                    }
                </div>
                <div className="col-lg-4">
                    <div className="card">
                        <div className="card-header">
                            <span className="text-uppercase h4">Current Active Budget</span>
                        </div>
                        {activeBudget ?
                            <div className="card-body pt-0">
                                <span className='h4 text-muted text-uppercase'>{activeBudget.name}</span><br />
                                <p>Description: {activeBudget.description}</p>
                                <p>Created By <span className="text-info">$ernest daniel</span> on {activeBudget.createdAt}</p>
                                <p>Activated By <span className="text-info">$ernest daniel</span> on {activeBudget.startDate}</p>
                                <p>Estimated Final Usage Date on {activeBudget.endDate}</p>
                            </div>
                            :
                            <div className="card-body pt-0">
                                <p>NO ACTIVE BUDGET</p>
                                Please ACTIVATE a budget to enable fund requesters to create new requests.
                            </div>
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}