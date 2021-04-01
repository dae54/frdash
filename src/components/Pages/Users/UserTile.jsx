import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
// import SweetAlert from 'react-bootstrap-sweetalert'
// import axios from 'axios'
import { setAvatar } from '../../AccessoryFunctions/avatarGenerator'
import { AppContext } from '../../services/AppContext';
// import { useAlert } from 'react-alert'
// import { Modal, Button } from 'react-bootstrap'
import DeleteUser from './DeleteUser';
export default function UserTile(props) {
    const { dispatch } = React.useContext(AppContext)
    let setBreadcrumbPath = path => dispatch({ type: 'breadcrumbPath', payload: path })
    // const alert = useAlert()

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        setBreadcrumbPath([
            { name: 'Users', url: '/users' },
        ])
    }, [])

    const hist = useHistory();

    const [userToDelete, setUserToDelete] = useState()

    function promptUserDelete(e) {
        setUserToDelete(e.target)
        handleShow()
    }

    const { firstName, lastName, phoneNumber, role, img, _id } = props.user;
    return (
        <React.Fragment>
            <div className="col-md-4 col-sm-4  col-lg-3">
                <div className="profile-widget">
                    <div className="doctor-img">
                        <div className="avatar" onClick={() => hist.push('user/profile', _id)}>
                            {img &&
                                <img alt="" src="assets/img/doctor-thumb-06.jpg" />
                            }
                            {!img &&
                                <div className="profile-img">
                                    <span className='avatar bg-info' style={{ fontSize: '5vh' }} >{setAvatar(firstName, lastName)}</span>
                                    {/* <img className="avatar" src="assets/img/doctor-03.jpg" alt="" /> */}
                                </div>
                                // <img width="" height="" src="assets/img/user.jpg" className="rounded-circle m-r-5" alt="" />
                            }
                        </div>
                    </div>
                    <div className="dropdown profile-action">
                        <span style={{ cursor: 'pointer' }} className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                            <i className="fa fa-ellipsis-v"></i>
                        </span>
                        <div className="dropdown-menu dropdown-menu-right">
                            <div className="dropdown-item" onClick={() => hist.push('user/edit', { userId: _id })} style={{ cursor: 'pointer' }}><i className="fa fa-pencil m-r-5"></i> Edit</div>
                            <div className="dropdown-item" userid={_id} username={firstName + ' ' + lastName} style={{ cursor: 'pointer' }} onClick={(e) => promptUserDelete(e)}><i className="fa fa-trash-o m-r-5"></i> Delete</div>
                        </div>
                    </div>
                    <h4 className="doctor-name text-ellipsis">
                        <div style={{ cursor: 'pointer' }} onClick={() => hist.push('user/profile', _id)}>{firstName + ' ' + lastName}</div>
                    </h4>
                    <div className="doc-prof text-info">{role.name}</div>
                    <div className="user-country">
                        <i className="fa fa-phone text-info"></i> {phoneNumber}
                    </div>
                </div>
            </div>
            {userToDelete &&
                <DeleteUser
                    show={show}
                    handleClose={handleClose}
                    userToDelete={userToDelete}
                    setUserToDelete={setUserToDelete}
                    userList={props.userList}
                    setUserList={(payload) => props.setUserList(payload)}
                />
            }


            {/* {userToDelete &&
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
                                onClick={() => deleteUser(userToDelete.getAttribute('userId'))}
                                disabled={userToDelete.getAttribute('userName') !== userName}>
                                Confirm Delete
                            </button>
                        }
                    </Modal.Footer>
                </Modal>
            } */}

            {/* {userToDelete &&
                <SweetAlert
                    warning
                    showCancel
                    confirmBtnText="Yes, delete it!"
                    confirmBtnBsStyle="danger"
                    title={`Are you sure you want to delete? ${userToDelete.getAttribute('username')}`}
                    onConfirm={() => deleteUser(userToDelete.getAttribute('userId'))}
                    onCancel={() => { setUserToDelete() }}
                    focusCancelBtn>
                    You will not be able to recover this user!
                </SweetAlert>
            } */}
        </React.Fragment>
    )
}
