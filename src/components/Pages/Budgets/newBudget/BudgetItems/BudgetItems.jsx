import React, { useEffect, useState } from 'react'
import axios from 'axios'

import AddNewBudgetItem from './AddNewBudgetItem'
import { BudgetContext } from '../NewBudgetContext'
import ExcelImport from './ExcelImport'

export default function BudgetItems() {
    const { state, dispatch } = React.useContext(BudgetContext)
    let setBudgetItems = budgetItems => dispatch({ type: 'budgetItems', payload: budgetItems })
    const [loading, setLoading] = useState(true)

    function fetchBudgetItems() {
        axios.get('/budgetItems/', {
        }).then(response => {
            //renaming _id field to budgetItemId
            for (var i = 0; i < response.data.data.length; i++) {
                response.data.data[i].budgetItemId = response.data.data[i]._id;
                delete response.data.data[i]._id
            }
            setLoading(false)
            setBudgetItems(response.data.data)//update state
        }).catch(error => {
            setLoading(false)
            console.log(error)
        })
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
            <div className="card shadow-sm">
                <div className="card-header bg-light">
                    <span>Budget Items</span>
                    <button className="btn btn-outline-info float-right" data-toggle="modal" data-target="#excelFileInput">
                        <i className="fa fa-plus"></i> &nbsp;
                        Import From Excel
                    </button>
                    <ExcelImport />
                </div>
                <div className="card-body">
                    {loading ?
                        <div>
                            <span className="spinner-border spinner-border-sm"></span> Please wait...
                        </div>
                        :
                        <>
                            <div className="row" style={{ maxHeight: '60vh', overflowY: 'auto', overflowX: 'none' }}>
                                {state.budgetItems.length !== 0 &&
                                    state.budgetItems.map((item) => {
                                        return (<BudgetItemAmount key={item.budgetItemId} budgetItem={item} onSetItemAmount={(amount) => setBudgetItemAmount(item.budgetItemId, amount)} />)
                                    })
                                }
                            </div>
                            <button type='button' className="btn btn-outline-info btn-block" data-toggle="modal" data-target="#addNewBudgetItemModal">
                                <i className="fa fa-plus"></i> &nbsp;Add New Budget Item
                            </button>
                            <AddNewBudgetItem />
                        </>
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

const BudgetItemAmount = (props) => {
    const { name, amount = '', checked } = props.budgetItem

    return (
        <div className="col-12">
            <div className={`row form-group  bg-secondar ${amount ? 'shadow-s bg-ligh' : ''}`} >
                <label className="col-12 col-md-12 col-lg-5 col-form-label">
                    {name}&nbsp;
                    {amount &&
                        <i className="fa fa-check"></i>
                    }
                </label>
                <div className="col">
                    <input type="number" value={amount} placeholder="Amount" className="form-control" onChange={e => props.onSetItemAmount(e.target.value)} />
                </div>
            </div>
        </div>
    )
}