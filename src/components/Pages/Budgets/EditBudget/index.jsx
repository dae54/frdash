import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import axios from 'axios'

import StatusFormatter from '../../../Gadgets/StatusFormatter'

export default function EditBudget(prop) {
    var newBudget;
    const hist = useHistory();
    const props = prop.budget

    const [name, setName] = useState(props.name)
    const [description, setDescription] = useState(props.description)
    const [uniqBudgetItems, setUniqBudgetItems] = useState([])
    const [selectedBudgetItem, setSelectedBudgetItem] = useState('{}')
    const [amount, setAmount] = useState('')
    //
    let budgetItems = [];
    props.budgetItems.forEach(item => {
        const _id = item.budgetItemId._id
        const name = item.budgetItemId.name
        const code = item.budgetItemId.code
        const amount = item.amount
        const budgetId = props._id
        budgetItems.push({ name, code, _id, amount, budgetId })
    })

    useEffect(() => {
        console.log(JSON.parse(selectedBudgetItem))
    }, [selectedBudgetItem])

    // a hook for after saving cell
    async function onAfterSaveCell(row, cellName, cellValue) {
        await axios.patch('/budgets/edit/budgetItems', {
            row,
        }).then(response => {
            newBudget = response.data.data
            console.log(response.data.data)
        }).catch(error => {
            console.log(error)
        })
    }
    // a hook for before saving cell
    function onBeforeSaveCell(row, cellName, cellValue) {
        if (cellName === 'amount') {
            return true;
        }
        return false
    }

    async function handleNameUpdate() {
        const budgetId = props._id
        const data = { name: name, budgetId }
        await axios.patch('/budgets/edit/budgetName', {
            data,
        }).then(response => {
            newBudget = response.data.data
            console.log(response.data.data)
        }).catch(error => {
            console.log(error)
        })
    }
    async function handleDescriptionUpdate() {
        const budgetId = props._id
        const data = { description: description, budgetId }
        await axios.patch('/budgets/edit/description', {
            data,
        }).then(response => {
            newBudget = response.data.data
            console.log(response.data.data)
        }).catch(error => {
            console.log(error)
        })
    }
    async function addNewItem() {
        axios.get('/budgetItems')
            .then(response => {
                setUniqBudgetItems(response.data.data.filter(item => {
                    return !budgetItems.some(it => {
                        return item._id === it._id
                    })
                }))
            }).catch(error => {
                console.log(error.response)
            })
    }
    const cellEditProp = {
        mode: 'click',
        blurToSave: true,
        beforeSaveCell: onBeforeSaveCell,
        afterSaveCell: onAfterSaveCell
    };
    function handleSyncChanges() {
        console.log(newBudget)
        hist.replace({ state: newBudget })
        console.log(hist.location)
    }

    function handleAddNewItem(e) {
        e.preventDefault()
        axios.patch('budgets/addItem', {
            data: { budgetItemId: JSON.parse(selectedBudgetItem)._id, amount, budgetId: props._id }
        }).then(response => {
            // console.log(newBudget)
            // newBudget.budgetItems
            // console.log(response.data.data)
        }).catch(error => {
            console.log(error.response)
        })
        // console.log(amount)
        // console.log(selectedBudgetItem)
    }

    return (
        <React.Fragment>
            <div className="modal fade" id="editBudgetModa" tabIndex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable modal-xl" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalScrollableTitle">Edit budget</h5>
                            {/* <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button> */}
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col">
                                    <div className="card shadow-none">
                                        {/* <div className="card-header">Budget Details</div> */}
                                        <div className="card-body">
                                            <div className="form-group row">
                                                <label className="col-lg-3 col-form-label">Budget Name:</label>
                                                <div className="col-lg-9">
                                                    <input type="text" className="form-control" placeholder="Budget Name" name='name' value={name} onChange={e => setName(e.target.value)} onBlur={handleNameUpdate} required />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-lg-3 col-form-label">Description:</label>
                                                <div className="col-lg-9">
                                                    <input type="text" className="form-control" name='description' placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} onBlur={handleDescriptionUpdate} required />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-lg-3 col-form-label">Status:</label>
                                                <div className="col-lg-9">
                                                    <StatusFormatter status={props.status + 10} />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-lg-3 col-form-label">DATE CREATED:</label>
                                                <div className="col-lg-9">
                                                    {props.createdAt}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6" styl={{ maxHeight: 500 }}>
                                    <div className="card shadow-none">
                                        <div className="card-body">
                                            <BootstrapTable trStyle={{ cursor: 'pointer' }} cellEdit={cellEditProp} data={budgetItems} maxHeight='400' bordered={false} search>
                                                <TableHeaderColumn thStyle={{ cursor: 'auto' }} dataField='name' >Name</TableHeaderColumn>
                                                <TableHeaderColumn thStyle={{ cursor: 'auto' }} isKey dataField='code'>CODE</TableHeaderColumn>
                                                <TableHeaderColumn thStyle={{ cursor: 'auto' }} dataField='amount'>Amount</TableHeaderColumn>
                                            </BootstrapTable>
                                            <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" onClick={addNewItem}>
                                                Add New
                                            </button>
                                            <form onSubmit={handleAddNewItem}>
                                                <div className="collapse" id="collapseExample">
                                                    <div className="input-group mb-3">
                                                        <select className="custom-select" onChange={(e) => setSelectedBudgetItem(e.target.value)} required >
                                                            <option value=' '>Choose Item</option>
                                                            {uniqBudgetItems.map(item => {
                                                                return (<option value={JSON.stringify(item)}>{item.name}</option>)
                                                            })}
                                                        </select>
                                                        <input type="text" placeholder='code' value={JSON.parse(selectedBudgetItem).code} className="form-control" readOnly required />
                                                        <input type="number" placeholder='amount' className="form-control" value={amount} onChange={(e) => setAmount(e.target.value)} required />
                                                    </div>
                                                    <button className="btn btn-sm btn-info" type='submit'>ADD</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => prop.setRequestEditBudget(false)}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleSyncChanges}>Sync Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}