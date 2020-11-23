import React, { useState } from 'react'
import { useAlert } from 'react-alert'
import { Modal } from 'react-bootstrap'
import axios from 'axios'

export default function DeleteBudgetItem(props) {
    const { show, handleClose, itemToDelete, setItemToDelete, itemList, setItemList } = props

    const [loading, setLoading] = useState(false)
    const [itemName, setItemName] = useState()
    const alert = useAlert()

    async function deleteBudgetItem() {
        setLoading(true)
        await axios.delete(`budgetItems/${itemToDelete._id}`)
            .then(({ data }) => {
                if (itemList) {
                    const newItemList = itemList.filter(item => {
                        if (!(item._id === data.data)) {
                            return item
                        }
                    })
                    setItemList(newItemList)
                }
                setLoading(false)
                setItemName()
                handleClose()
                alert.success(data.message)
            }).catch(error => {
                setLoading(false)
                console.log(error)
            })
    }

    return (
        <React.Fragment>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <span class="modal-title text-dark font-weight-bold">
                        Are you absolutely sure?
                        </span>
                </Modal.Header>
                <Modal.Body className=''>
                    <p className='text-dark alert alert-warning'>
                        This action cannot be undone. This will permanently delete the requests and budgets associated with the item
                        {/* {userToDelete.getAttribute('username')} request data and history */}
                    </p>
                    <span className='mb-5'>
                        Please type <span className='text-dark font-weight-bold'> {itemToDelete.name} </span>to confirm.
                    </span>
                    <input className='form-control mt-3' type='text' value={itemName} onChange={(e) => setItemName(e.target.value)} />
                </Modal.Body>
                <Modal.Footer>
                    {loading ?
                        <button className='btn btn-default btn-block'>
                            <div className="spinner-border spinner-border-sm" role="status">
                                <span className="sr-only">Loading...</span>
                            </div> &nbsp; Deleting
                            </button>
                        :
                        <button className="btn btn-outline-danger btn-block"
                            onClick={() => deleteBudgetItem(itemToDelete._id)}
                            disabled={itemToDelete.name !== itemName}>
                            Confirm Delete
                        </button>
                    }
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    )
}
