import React, { useState } from 'react'
import axios from 'axios'

import { BudgetContext } from '../NewBudgetContext'
import URL from '../../../../../URL'
export default function AddNewBudgetItem(props) {
    const { state, dispatch } = React.useContext(BudgetContext)
    let addBudgetItem;
    if (!props.setCreatedItem) {
        addBudgetItem = budgetItem => dispatch({ type: 'addBudgetItem', payload: budgetItem })
    }

    const [name, setName] = useState('')
    const [code, setCode] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    function handleSubmit(e) {
        setError(false)
        setMessage('')
        setIsLoading(true)
        e.preventDefault()
        createNewBudgetItem(name, code.toUpperCase(), description)
    }

    function createNewBudgetItem(name, code, description) {
        axios.post(`${URL}/budgetItems`, {
            budgetItems: [{ name: name, code: code, description: description }]
        }).then(response => {
            setIsLoading(false)
            if (!props.setCreatedItem) {
                //renaming _id field to budgetItemId
                response.data.data.createdItems[0].budgetItemId = response.data.data.createdItems[0]._id
                // delete response.data.data._id
                delete response.data.data.createdItems[0]._id
                addBudgetItem(response.data.data.createdItems[0]);
            }
            if (props.setCreatedItem) {
                console.log('here setCreatedItem')
                props.setCreatedItem(response.data.data.createdItems[0])
            }
            setError(false)
            setName('')
            setCode('')
            setDescription('')
            setMessage(response.data.message)
        }).catch(error => {
            setIsLoading(false)
            // setError(true)
            // if (error.message === 'Network Error') {
            //     setMessage('Network Error')
            // } else {
            //     setMessage(error.response.data.userMessage)
            // }
            console.log(error.response)
            console.log(error)
        })
    }
    return (
        <React.Fragment>
            <form onSubmit={handleSubmit}>
                <div className="modal fade" id="addNewBudgetItemModal" tabIndex="-1" role="dialog" aria-labelledby="addNewBudgetItemModal" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content card-box shadow-sm">
                            <div className="row">
                                <div className="col-md-12">
                                    {message &&
                                        <Message message={message} error={error} />
                                    }
                                    <h4 className="card-title">CREATE NEW BUDGET ITEM</h4>
                                    <div className="form-group">
                                        <label>Item Name</label>
                                        <input type="text" className="form-control col-12" value={name} onChange={e => setName(e.target.value)} required />
                                    </div>
                                    <div className="form-group mt-3">
                                        <label>Item Code</label>
                                        <input type="text" className="form-control col-12 text-uppercase" value={code} maxLength='5' minLength='5' onChange={e => setCode(e.target.value)} required />
                                    </div>
                                    <div className="form-group mt-3">
                                        <label>Item Description</label>
                                        <textarea className="form-control col-12 " value={description} onChange={e => setDescription(e.target.value)} required />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
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
                                {!isLoading &&
                                    <>
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="submit" className="btn btn-primary">Save</button>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </React.Fragment>
    )
}

const Message = (props) => {
    console.log(props)
    const { message, error } = props
    let status;
    return (
        <>
            {error &&
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>Warning!</strong> <span className="alert-lik">{message}</span>.
                                    {/* <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button> */}
                </div>
            }
            {!error &&
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>Success!</strong> {message}.
                                    {/* <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button> */}
                </div>
            }
        </>
    )
}