import React from 'react'
import { BudgetContext } from '../../newBudget/NewBudgetContext'
import axios from 'axios'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import URL from '../../../../../URL'

export default function PreviewBudget() {
    var budgetItemAndValue = [];

    const { state } = React.useContext(BudgetContext)
    // const { state, dispatch } = React.useContext(BudgetContext)
    function handleSubmit() {
        // console.log(state)
        const status = state.activateBudget ? 1 : 0;
        const budgetId = state.budgetId
        const newBudget = {
            budgetItemAndValue,
            budgetId,
            status: status,
        }
        console.log(newBudget)

        axios.post(`${URL}/budgets/addBudgetItemsToBudget`, {
            newBudget
        }).then(response => {
            // toast.success(response.data.data.message)
            window.location.replace('/budgets',{news:'done'})
            //renaming _id field to budgetItemId
            // response.data.data.budgetItemId = response.data.data._id;
            // delete response.data.data._id
            // append checked status
            // response.data.data.checked = true
            // setBudgetItems(oldBudgetItem => [...oldBudgetItem, response.data.data])//update state
            // Budget.setBudgetItems(oldBudgetItem => [...oldBudgetItem, response.data.data])//update context
        }).catch(error => {
            // toast.error(error.response.data.userMessage)
            console.log(error.response)
        })
    }

    return (
        <React.Fragment>
            <div className="modal fade" id="exampleModalScrollable" tabIndex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable modal-xl" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalScrollableTitle">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-6">
                                    <table className='table'>
                                        <tr>
                                            <td>Budget Name:</td>
                                            <td>{state.budgetName}</td>
                                        </tr>
                                        <tr>
                                            <td>Budget Description:</td>
                                            <td>{state.budgetDescription}</td>
                                        </tr>
                                        <tr>
                                            <td>Budget Start Date:</td>
                                            <td>{state.startDate}</td>
                                        </tr>
                                        <tr>
                                            <td>Budget End Date:</td>
                                            <td>{state.endDate}</td>
                                        </tr>
                                        <tr>
                                            <td>Activate Budget:</td>
                                            <td>{state.activateBudget && 'Yes' || 'No'}</td>
                                        </tr>
                                    </table>
                                </div>
                                <div className="col-6" style={{ maxHeight: 500 }}>
                                    {state.budgetItems.map(item => {
                                        if (item.checked && item.amount) {
                                            budgetItemAndValue.push(item)
                                        }
                                    })}
                                    <PreviewBudgetItems budgetItemAndValue={budgetItemAndValue} />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Create</button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

const PreviewBudgetItems = ({budgetItemAndValue}) => {
    return (
        <div className="card-block">
            <BootstrapTable trStyle={{ cursor: 'pointer' }} data={budgetItemAndValue} search>
                <TableHeaderColumn thStyle={{ cursor: 'auto' }} dataField='name' >Name</TableHeaderColumn>
                <TableHeaderColumn thStyle={{ cursor: 'auto' }} isKey dataField='code'>CODE</TableHeaderColumn>
                <TableHeaderColumn thStyle={{ cursor: 'auto' }} dataField='amount'>Amount</TableHeaderColumn>
            </BootstrapTable>
        </div>
    )
}