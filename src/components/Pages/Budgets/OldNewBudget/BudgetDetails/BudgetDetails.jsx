import React, { useEffect, useState } from 'react'
import axios from 'axios'

import URL from '../../../../../URL'
import BudgetItemAmount from './BudgetItemAmount'
import { BudgetContext } from '../../newBudget/NewBudgetContext'
import AddNewBudgetItem from '../../newBudget/BudgetItems/AddNewBudgetItem'
import PreviewBudget from './PreviewBudget'


export default function BudgetDetails() {
    const { state, dispatch } = React.useContext(BudgetContext)
    let setBudgetItems = budgetItems => dispatch({ type: 'budgetItems', payload: budgetItems })

    function fetchBudgetItems() {
        axios.get(`${URL}/budgetItems/`, {
        }).then(response => {
            //renaming _id field to budgetItemId
            for (var i = 0; i < response.data.data.length; i++) {
                response.data.data[i].budgetItemId = response.data.data[i]._id;
                delete response.data.data[i]._id
                // append checked status
                response.data.data[i].checked = true
            }
            setBudgetItems(response.data.data)//update state
        }).catch(error => {
            console.log(error)
        })
    }
    
    function toggleCheckbox(code) {
        const checkedBudgetItem = state.budgetItems.map(item => {
            if (item.code === code)
                item.checked = !item.checked;
            return item;
        });
        setBudgetItems(checkedBudgetItem);
    }
    function setBudgetItemAmount(id, amount) {
        const updatedBudgetItems = state.budgetItems.map(item => {
            if (item.budgetItemId === id)
                item.amount = amount;
            return item;
        });
        setBudgetItems(updatedBudgetItems);
    }


    useEffect(() => {
        fetchBudgetItems();
    }, [])
    return (
        <React.Fragment>
            <div className="col-6">
                <form>
                    <div className="alert alert-info alert-dismissible fade show" role="alert">
                        <strong>2.</strong> Then add budget items <strong>(By selecting items below)</strong>
                    </div>
                    <div className="card-box shadow-sm">
                        <div className="row">
                            <div className="col-md-12 col-12 col-lg-12">
                                <h4 className="card-title">Budget details</h4>
                                <div className="form-group row bg-light">
                                    <label className="col-lg-3 col-form-label text-dark">Name</label>
                                    <label className="col-lg-4 col-form-label text-dark">Code</label>
                                    <label className="col-lg-4 col-form-label text-dark">Amount</label>
                                    <label className="col-lg-1 col-form-label text-dark">Use?</label>
                                </div>
                                <div style={{ maxHeight: 520, overflowY: 'auto', overflowX: 'hidden' }}>
                                    {state.budgetItems.length !== 0 &&
                                        state.budgetItems.map((item) => {
                                            return (<BudgetItemAmount key={item.budgetItemId} budgetItem={item} toggleCheckbox={toggleCheckbox} onSetItemAmount={(amount) => setBudgetItemAmount(item.budgetItemId, amount)} />)
                                        })
                                    }
                                </div>
                            </div>
                            <div className="btn btn-success btn-block" data-toggle="modal" data-target="#exampleModalScrollable">Preview</div>
                            <PreviewBudget />
                            <div className='form-inline mt-4'>
                                <div className="ml-2 text-uppercase">dont see budget item listed?</div>
                                <button type='button' className="btn btn-outline-info btn-rounded ml-4" data-toggle="modal" data-target="#exampleModalCenter">
                                    <i className="fa fa-plus"></i> &nbsp;Add
                                </button>
                                <AddNewBudgetItem />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </React.Fragment>
    )
}