import React, { useState } from 'react'
import { useAlert } from 'react-alert'
import { Modal } from 'react-bootstrap'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
export default function DeleteUser(props) {
    const { show, handleClose, userToDelete, setUserToDelete, userList, setUserList } = props
    const hist = useHistory()

    // const [userToDelete, setUserToDelete] = useState()
    const [loading, setLoading] = useState(false)
    const [userName, setUserName] = useState()
    const alert = useAlert()


    async function deleteUser(userId) {
        setLoading(true)

        await axios.delete(`/user/${userId}`, {
        }).then(response => {
            if (userList) {
                const newUserList = userList.filter(item => {
                    if (!(item._id === response.data.data._id)) {
                        return item
                    }
                    return ''
                })
                setUserList(newUserList)
            }
            setLoading(false)
            setUserName()
            handleClose()
            alert.success(response.data.message)
            setUserToDelete()
            if(!userList){
                hist.goBack()
            }
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
                    <p className='text-dark'>
                        This action cannot be undone. This will permanently delete the {userToDelete.getAttribute('username')} request data and history
                        </p>
                    <span className='mb-5'>
                        Please type <span className='text-dark font-weight-bold'> {userToDelete.getAttribute('username')} </span>to confirm.
                        </span>
                    <input className='form-control mt-3' type='text' value={userName} onChange={(e) => setUserName(e.target.value)} />
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
                            onClick={() => deleteUser(userToDelete.getAttribute('userid'))}
                            disabled={userToDelete.getAttribute('userName') !== userName}>
                            Confirm Delete
                            </button>
                    }
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    )
}
