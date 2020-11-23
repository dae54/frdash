import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import moment from 'moment'
import { useAlert } from 'react-alert'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import DeleteBudgetItem from './DeleteBudgetItem';
import AddNewBudgetItem from '../newBudget/BudgetItems/AddNewBudgetItem';

export default function BudgetItems() {
    const [budgetItems, setBudgetItems] = useState({ loading: true, data: [] })
    const [latestUpdate, setLatestUpdate] = useState({ loading: false, data: '' })
    const [createdItem, setCreatedItem] = useState()

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [itemToDelete, setItemToDelete] = useState()

    // const [editBudget, setEditBudget] = useState({ status: false, data: '' })
    // const [val, setVal] = useState()

    const alert = useAlert()
    async function fetchBudgetItems() {
        await axios.get('budgetItems').then(response => {
            console.log(response.data.data)
            setBudgetItems({ loading: false, data: response.data.data })
        }).catch(error => {
            setBudgetItems({ loading: false, data: [] })
            console.log(error)
        })
    }

    function handleDeleteItem(data) {
        console.log(data)
        setItemToDelete(data)
        handleShow()
    }
    function handleItemAction(row, col) {
        return (
            <>
                {/* <span className="text-success mr-2" id={item} style={{ cursor: 'pointer' }}>
                    <i className="fa fa-pencil" style={{ fontSize: 15 }}></i>
                </span> */}
                <span className="text-danger" style={{ cursor: 'pointer' }} onClick={() => handleDeleteItem(col)}>
                    <i className="fa fa-trash" data={col} style={{ fontSize: 15 }}></i>
                </span>
            </>
        )
    }
    async function onAfterSaveCell(row, cellName, cellValue) {
        setLatestUpdate({ loading: true, data: '' })
        await axios.patch(`budgetItems/${row._id}`, {
            data: { parameter: cellName, value: cellValue }
        })
            .then(response => {
                setLatestUpdate({ loading: false, data: response.data.data })
                console.log(response.data.data)
                alert.success(response.data.message)
            }).catch(error => {
                setLatestUpdate({ loading: false, data: '' })
                console.log(error.response)
            })
    }

    useEffect(() => {
        console.log('called')
        // console.log(createdItem)
        if (createdItem) {
            console.log('am in now')
            const newBudgetItemsList = budgetItems.data.push(createdItem)
            // console.log(newBudgetItemsList)
            setBudgetItems(newBudgetItemsList)
            setCreatedItem()
        }
    }, [createdItem])

    // async function addNewItem(){

    // }

    const cellEditProp = {
        mode: 'click',
        blurToSave: true,
        afterSaveCell: onAfterSaveCell
    };

    useEffect(() => {
        fetchBudgetItems()
    }, [])
    return (
        <React.Fragment>
            <div className="row">
                <div className="col-10">
                    <div className="card">
                        <div class="alert alert-warning alert-dismissible fade show" role="alert">
                            <p>1. Edit item by clicling on the particular field. (<small><strong>Code</strong> field cant be edited</small>)</p>
                            <span className='mt-'>2. Save Edits by using Enter key/ Blur out.</span>
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="card-header pb-2 d-flex justify-content-between">
                            <h4 className='card-title'>Budget Items</h4>
                            {latestUpdate.loading ?
                                <div className="btn btn-default btn-sm pl-5 pr-5 float-right">
                                    <span className="spinner-border spinner-border-sm"></span> Uploading ...
                                </div>
                                :
                                <div className='float-right'>
                                    <div className="btn btn-info btn-sm pl-5 pr-5 float-righ mr-2" data-toggle="modal" data-target="#addNewBudgetItemModal"> <i className="fa fa-plus"></i> Create New</div>
                                    <div className="btn btn-default btn-sm pl-5 pr-5 float-righ">All is Up to date</div>
                                    <AddNewBudgetItem setCreatedItem={setCreatedItem} />
                                </div>
                            }

                        </div>
                        <div className="card-body pt-0" >
                            {/* <div className="row">
                                <div className="col-6">
                                    <span className='pb-0 mb-0 text-default'>1. Edit item by clicling on the particular field.</span><br />
                                    <small>NB. Code field cant be edited</small><br />
                                    <div className="btn btn-default btn-sm">New</div>
                                    <button className="btn btn-default btn-sm pl-5 pr-5">Create New Item</button>
                                </div>
                                <div className="col-6">
                                    <span className='mt-3'>2. Save Edits by using Enter key/ Blur out.</span>
                                </div>
                            </div> */}
                            {budgetItems.loading ?
                                <p>
                                    <div className="spinner-border spinner-border-sm" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div> &nbsp; Contacting server. Please wait
                                </p>
                                :
                                <div className="">
                                    <BootstrapTable cellEdit={cellEditProp} data={budgetItems.data} dataField='budgetItems' pagination hover bordered={false} version='4' search>
                                        <TableHeaderColumn dataField='name' dataSort={true}>Name</TableHeaderColumn>
                                        <TableHeaderColumn dataField='code' dataSort={true} isKey editable={false}>Code</TableHeaderColumn>
                                        <TableHeaderColumn dataField='description'>Description</TableHeaderColumn>
                                        <TableHeaderColumn dataFormat={(row, col) => handleItemAction(row, col)} editable={false} dataAlign='end' >Action</TableHeaderColumn>
                                    </BootstrapTable>
                                    {itemToDelete &&
                                        <DeleteBudgetItem
                                            show={show}
                                            handleClose={handleClose}
                                            itemToDelete={itemToDelete}
                                            setItemToDelete={setItemToDelete}
                                            itemList={budgetItems.data}
                                            setItemList={(payload) => setBudgetItems({ loading: false, data: payload })} />
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
