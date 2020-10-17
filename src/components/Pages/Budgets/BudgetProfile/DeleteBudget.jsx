import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

import URL from '../../../../URL'

export default function DeleteBudget(props) {
    const [budgetDeleted, setBudgetDeleted] = useState(false)
    const [isloading, setIsloading] = useState(false)
    const hist = useHistory();

    console.log(props.budget)
    async function handleSyncChanges() {
        setIsloading(true)
        const budgetId = props.budget._id
        await axios.delete(`${URL}/budgets`, {
            params: { budgetId }
        }).then(response => {
            setIsloading(true)
            setBudgetDeleted(true)
            console.log(response.data)
        }).catch(error => {
            console.log(error)
        })
    }
    function doneDelete() {
        props.setDeleteBudget(false)
        hist.replace('/budgets')
    }
    return (
        <React.Fragment>
            <div className="modal fade" id="deleteBudgetModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable modal-md" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-3">
                                    <i className="fa fa-times-circle-o text-danger" style={{ fontSize: '100px', fontWeight: '10' }}></i>
                                </div>
                                <div className="col">
                                    You are about to delete <br />
                                    <span className="text-weight-bold">Budget Name: </span>{props.budget.name}<br />
                                    Created At: {props.budget.createdAt}<br />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            {!budgetDeleted &&
                                <>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary" onClick={handleSyncChanges}>Confirm Delete</button>
                                </>
                            }
                            {budgetDeleted &&
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={doneDelete}>Close</button>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
