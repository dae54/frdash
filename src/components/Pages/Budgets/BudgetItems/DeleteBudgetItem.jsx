import React, { useState } from 'react'
import { useAlert } from 'react-alert'
import { Modal } from 'react-bootstrap'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function DeleteBudgetItem(props) {
    const { show, handleClose, itemToDelete, setItemToDelete, itemList, setItemList } = props

    const [loading, setLoading] = useState(false)
    const [itemName, setItemName] = useState("")
    const [error, setError] = useState({ message: '', data: [] })

    const alert = useAlert()

    async function deleteBudgetItem() {
        setLoading(true)
        setError({ message: '', data: [] })

        await axios.delete(`budgetItems/${itemToDelete._id}`)
            .then(({ data }) => {
                setLoading(false)

                // console.log(data)
                if (!data.status) {
                    setError({ message: data.message, data: data.data })
                    return
                }
                if (itemList) {
                    const newItemList = itemList.filter(item => {
                        if (!(item._id === data.data)) {
                            return item
                        }
                    })
                    setItemList(newItemList)
                }
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
                    <span className="modal-title text-dark font-weight-bold">
                        Are you absolutely sure?
                        </span>
                </Modal.Header>
                <Modal.Body className=''>
                    <p className='text-dark alert alert-warning'>
                        This action cannot be undone. This will permanently delete the requests and budgets associated with the item
                    </p>
                    <span className='mb-5'>
                        Please type <span className='text-dark font-weight-bold'> {itemToDelete.name} </span>to confirm.
                    </span>
                    <input className='form-control mt-3' type='text' value={itemName} onChange={(e) => setItemName(e.target.value)} />
                    {error.message &&
                        <div className='text-dark alert alert-danger mt-2'>
                            <p>{error.message}</p>
                            <ol>
                                {error.data.map(item => {
                                    return <li key={item._id}>
                                        {item.name} &nbsp;
                                        <Link to={{ pathname: '../budget/profile', state: { budgetId: item._id } }}><i className="fa fa-link"></i></Link>
                                    </li>
                                })}
                            </ol>
                        </div>
                    }
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
