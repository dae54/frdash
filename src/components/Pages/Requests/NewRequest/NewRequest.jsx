import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
// import SweetAlert from 'react-bootstrap-sweetalert'

export default function NewRequest() {
    const history = useHistory()

    const [budget, setBudget] = useState([])
    const [budgetItem, setBudgetItem] = useState(0)
    const [description, setDescription] = useState('')
    const [amount, setAmount] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [message, setMessage] = useState({})

    function fetchBudget() {
        setIsLoading(true)
        axios.get(`budgets/${1}`, {
        }).then((response) => {
            setIsLoading(false)
            console.log(response.data.data)
            if (response.data.data.length === 0) {
                return setError("please wait for the budget for this quota to be released.")
            }
            setBudget(response.data.data)
        }).catch((error) => {
            setIsLoading(false)
            console.log(error.response)
            // setError(error.response.data.userMessage)
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        setIsLoading(true)
        axios.post('/requests', {
            budgetItemId: budgetItem, description, amount, budgetId: budget[0]._id
        }).then((response) => {
            setIsLoading(false)
            console.log(response.data.data)
            setIsLoading(false)
        }).catch((error) => {
            setIsLoading(false)
            console.log(error.response)
            // setError(error.response.data.userMessage)
        })
    }
    useEffect(() => {
        fetchBudget();
    }, [])
    return (
        <React.Fragment>
            <div className="container">
                {error &&
                    <div className="row">
                        <div className="col-6">
                            <div className="alert alert-dark fade show text-uppercase" role="alert">
                                <span><strong>we're Sorry for the inconvenience!!</strong></span><br />
                                <span className="">{error}</span>.
                            </div>
                        </div>
                    </div>
                }
                <div className="row">
                    <div className="col-sm-4 col-3">
                        <h4 className="page-title">Create New Request</h4>
                    </div>
                    <div className="col-sm-8 col-9 text-right m-b-20">
                        <div className="btn btn-primary btn-rounded float-right" onClick={() => history.push('/requests')}>
                            <i className="fa fa-eye"></i> View All Requests
                            </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Select Budget Item</label>
                                <select className='form-control' value={budgetItem} onChange={(e) => setBudgetItem(e.target.value)} required>
                                    <option value=''>...</option>
                                    {budget.length &&
                                        budget[0].budgetItems.map(item => {
                                            return (
                                                <option value={item.budgetItemId._id}>{item.budgetItemId.name} ({item.budgetItemId.description})</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="form-group mt-3">
                                <label>Descriptions</label>
                                <textarea className="form-control col-12" value={description} onChange={e => setDescription(e.target.value)} required />
                            </div>
                            <div className="form-group mt-3">
                                <label>Amount</label>
                                <input type='number' className="form-control col-12 " value={amount} onChange={e => setAmount(e.target.value)} required />
                            </div>
                            {!isLoading &&
                                <div className="text-right">
                                    <button type="submit" className="btn btn-primary">CREATE REQUEST</button>
                                </div>
                            }
                            {isLoading &&
                                <div className="text-right">
                                    <button className="btn btn-primary" disabled>
                                        <div>
                                            <div className="spinner-border text-light spinner-border-sm " role="status">
                                                <span className="sr-only">Please Wait...</span>
                                            </div>
                                        &nbsp;Please Wait...
                                        </div>
                                    </button>
                                </div>
                            }
                        </form>
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}