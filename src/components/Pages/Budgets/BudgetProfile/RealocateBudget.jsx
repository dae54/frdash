import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function RealocateBudget(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [budgetItems] = useState(
        props.budget.budgetItems.map(item => {
            return { name: item.budgetItemId.name, id: item.budgetItemId._id, amount: item.amount }
        })
    )
    // const [budgets, setBudgets] = useState([])
    const [selectedBudgetItem, setSelectedBudgetItem] = useState({})

    // function fetchAllBudgets() {
    //     axios.get('/budgets')
    //         .then(response => {
    //             console.log(response)
    //             setBudgets(response.data.data)
    //         }).catch(error => {
    //             console.log(error.response)
    //         })
    // }

    // useEffect(() => {
    //     fetchAllBudgets()
    // }, [])
    return (
        <React.Fragment>
            <div className="modal fade" id="realocateBudgetModal" data-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable modal-md" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            Transfer Window
                        </div>
                        <div className="modal-body">
                            <div className="container-fluid">
                                <form className='form-'>
                                    <select class="form-control form-control-lg mb-2" onChange={(e) => setSelectedBudgetItem(JSON.parse(e.target.value))}>
                                        <option value=" ">Select item</option>
                                        {budgetItems.map(item => <option value={JSON.stringify(item)}>{item.name}</option>)}
                                    </select>
                                    <div className="form-group row">
                                        <div className="col-6">
                                            <label>From</label>
                                            <select class="form-control form-control-lg mb-2">
                                                <option value="">Cash</option>
                                                {/* {budgets.map(item => <option value={item._id}>{item.name}</option>)} */}
                                            </select>
                                        </div>
                                        <div className="col-6">
                                            <label>To</label>
                                            <input type="text" className="form-control col-12" value='first quota budget' disabled />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-6">
                                            <label>Amount</label>
                                            <input type="number" className="form-control col-12" placeholder='Enter the amount to be transfered' />
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label>Initial Amount</label>
                                                <input type="text" className="form-control col-12" value={selectedBudgetItem.amount} readOnly />
                                            </div>
                                            <div className="form-group">
                                                <label>Amount after realocation</label>
                                                <input className="form-control col-12 " readOnly />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            {isLoading ?
                                <button className="btn btn-primary btn-" disabled>
                                    <div>
                                        <div className="spinner-border text-light spinner-border-sm " role="status">
                                            <span className="sr-only">Please Wait...</span>
                                        </div>
                                        &nbsp;Please Wait...
                                    </div>
                                </button>
                                :
                                <>
                                    <button className="btn btn-secondary " data-dismiss="modal">CLOSE</button>
                                    <button type="submit" className="btn btn-primary ">APROVE REALOCATION</button>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
