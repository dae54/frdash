import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert'
import axios from 'axios'
import { setAvatar } from '../../AccessoryFunctions/avatarGenerator'

export default function Users(props) {
    console.log(props)
    const hist = useHistory();

    const [userToDelete, setUserToDelete] = useState()
    async function deleteUser(userId) {
        await axios.delete(`/user/${userId}`, {
        }).then(response => {
            const newUserList = props.userList.filter(item => {
                if (!(item._id === response.data.data._id)) {
                    return item
                }
            })
            props.setUserList(newUserList)
            setUserToDelete()
        }).catch(error => {
            console.log(error)
        })
    }

    const { firstName, lastName, phoneNumber, roleId, img, _id } = props.user;
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
                        <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v"></i></a>
                        <div className="dropdown-menu dropdown-menu-right">
                            <div className="dropdown-item" onClick={() => hist.push('user/edit', { userId: _id })} style={{ cursor: 'pointer' }}><i className="fa fa-pencil m-r-5"></i> Edit</div>
                            <div className="dropdown-item" userId={_id} userName={firstName + ' ' + lastName} style={{ cursor: 'pointer' }} onClick={(e) => setUserToDelete(e.target)}><i className="fa fa-trash-o m-r-5"></i> Delete</div>
                        </div>
                    </div>
                    <h4 className="doctor-name text-ellipsis">
                        <div style={{ cursor: 'pointer' }} onClick={() => hist.push('user/profile', _id)}>{firstName + ' ' + lastName}</div>
                    </h4>
                    <div className="doc-prof text-info">{roleId.name}</div>
                    <div className="user-country">
                        <i className="fa fa-phone text-info"></i> {phoneNumber}
                    </div>
                </div>
            </div>
            {userToDelete &&
                <SweetAlert
                    warning
                    showCancel
                    confirmBtnText="Yes, delete it!"
                    confirmBtnBsStyle="danger"
                    title={`Are you sure you want to delete? ${userToDelete.getAttribute('userName')}`}
                    onConfirm={() => deleteUser(userToDelete.getAttribute('userId'))}
                    onCancel={() => { setUserToDelete() }}
                    focusCancelBtn>
                    You will not be able to recover this user!
                </SweetAlert>
            }
        </React.Fragment>
    )
}
