import React, { useState, useEffect, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import InfoCard from '../../Gadgets/InfoCard'
import BudgetDataTable from './BudgetDatatable'
import Statistics from './Statistics'
import URL from '../../../URL'
import { AppContext } from '../../services/AppContext'


export default function Budgets() {
    const { dispatch } = useContext(AppContext)
    let setBreadcrumbPath = path => dispatch({ type: 'breadcrumbPath', payload: path })

    useEffect(() => {
        setBreadcrumbPath([
            { name: 'Budgets' },
        ])
    }, [])

    const [budgets, setBudgets] = useState({ loading: true, data: [] })
    const [activeBudget, setActiveBudget] = useState()

    async function fetchBudgets() {
        await axios.get(`${URL}/budgets`, {
        }).then(response => {
            setBudgets({ loading: false, data: response.data.data })
        }).catch(error => {
            setBudgets({ loading: false, data: [] })
            console.log(error)
        })
    }
    useEffect(() => {
        fetchBudgets();
    }, [])

    useEffect(() => {
        setActiveBudget(budgets.data.filter(budget => budget.status === 1).pop())
    }, [budgets.data])

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
                    {budgets.loading ?
                        <>
                            <div className="spinner-border spinner-border-sm" role="status">
                                <span className="sr-only">Loading...</span>
                            </div> &nbsp; Contacting server. Please wait
                        </>
                        :
                        budgets.data.length ?
                            <BudgetDataTable budgets={budgets.data} />
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