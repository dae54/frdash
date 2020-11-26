import React, { useState } from 'react'
import axios from 'axios'
import { useHistory, Link } from 'react-router-dom'
import moment from 'moment'

import StatusFormatter from '../../../Gadgets/StatusFormatter'

export default function BudgetInformation({ budget, setRequestEditBudget, setDeleteBudget }) {
    const hist = useHistory();

    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [statusText, setStatusText] = useState('')
    // const props = prop.budget.location.state;
    // const props = prop.budget;
    async function toggleStatus() {
        setErrorMessage('')
        setIsLoading(true)
        await axios.patch(`/budgets/${budget._id}/${budget.status ? 0 : 1}`, {
        }).then(response => {
            setIsLoading(false)
            hist.replace({ state: response.data.data })
        }).catch(error => {
            if (error.message === 'Network Error') {
                console.log('Network Error')
                setErrorMessage('Network')
            } else {
                setErrorMessage(error.response.data.userMessage)
                setStatusText(error.response.statusText + ' (' + error.response.status + ')')
                setIsLoading(false)
            }
        })
    }
    return (
        <React.Fragment>
            <div className="card">
                {errorMessage &&
                    <div className="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>{statusText}!</strong> {errorMessage} <a href="#" className="alert-link"></a>.
                                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                }
                <div className="card-header text-uppercase"></div>
                <div className="card-body pt-0">
                    <p>{budget.name.toUpperCase()}</p>
                    <p className='mt-n2'>Description: {budget.description}</p>
                    <p>Created By &nbsp;
                        <Link to={{ pathname: '../../user/profile', state: budget.createdBy._id }}>
                            ${budget.createdBy.lastName + ', ' + budget.createdBy.firstName}
                        </Link> on {moment(budget.createdAt).format('DD MMM YYYY, hh:mm A')}
                    </p>
                    {budget.activatedBy &&
                        <p>Activated By &nbsp;
                            <Link to={{ pathname: '../../user/profile', state: budget.activatedBy._id }}>
                                ${budget.activatedBy.lastName + ', ' + budget.activatedBy.firstName}
                            </Link> on {moment(budget.activatedBy.createdAt).format('DD MMM YYYY, hh:mm A')}
                        </p>
                    }
                    <p>Estimated Final Usage Date on {budget.endDate}</p>
                    <p>Status</p>
                    <div className='d-fle'>
                        <StatusFormatter status={budget.status + 10} />
                        {isLoading ?
                            <span className="text-white bg-info p-2 ml-4">
                                <div className="spinner-border text-white spinner-border-sm"></div>
                                &nbsp;Please Wait...
                            </span>
                            :
                            <span className={`btn btn-${budget.status ? 'warning' : 'info'} btn-sm ml-4`} onClick={toggleStatus}>{budget.status ? 'DEACTIVATE' : 'ACTIVATE'}</span>
                        }
                    </div>
                    <div className="mt-4">
                        Actions
                        <div className="d-flex justify-content-between mt-1">
                            <button className="btn btn-outline-info" data-toggle="modal" data-target="#editBudgetModal" onClick={() => setRequestEditBudget(true)}>Edit Budget</button><br />
                            <button className="btn btn-outline-danger" data-toggle="modal" data-target="#deleteBudgetModal" onClick={() => setDeleteBudget(true)}>Delete Budget</button><br />
                            <button className="btn btn-outline-success">Extend Budget</button><br />
                            <button className="btn btn-outline-info" data-toggle="modal" data-target="#realocateBudgetModal">Reallocate Budget</button><br />
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}