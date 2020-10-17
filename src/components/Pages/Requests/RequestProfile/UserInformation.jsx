import React, { useEffect, useState } from 'react'
import axios from 'axios'
import URL from '../../../../URL'
import { useHistory } from 'react-router-dom'
import { setAvatar } from '../../../AccessoryFunctions/avatarGenerator';

export default function UserInformation(props) {
    const hist = useHistory();

    // console.log(props)
    const [user, setUser] = useState({})
    async function fetchUserById() {
        try {
            const response = await axios.get(`${URL}/user/${props.userId}`, {
                params: '',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
            // console.log(response.data.data);
            setUser(response.data.data)
        } catch (error) {
            console.log('error')
            console.error(error.response);
        }
    }
    function viewUser() {
        hist.replace('/user/profile', props.userId)
    }
    useEffect(() => {
        fetchUserById();
    }, [])
    return (
        <React.Fragment>
            <div className="card">
                <div className="card-header text-uppercase">User Information</div>
                <div className="card-body">
                    <div className="col-md-12">
                        <div className="profile-view">
                            <div className="profile-img-wrap">
                                <div className="profile-img">
                                    {user.img &&
                                        <img alt="" src="assets/img/user.jpg" />
                                    }
                                    {!user.img &&
                                        <div className="profile-img">
                                            <span className='avatar bg-info' style={{ fontSize: '8vh' }} >{setAvatar(user.firstName, user.lastName)}</span>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="profile-basic">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="profile-info-lef">
                                            <h3 className="user-name m-t-0 mb-0 text-uppercase">{user.firstName + ' ' + user.lastName} </h3>
                                            <small className="text-muted text-monospace">Strategy Lead</small>
                                            <ul className="personal-info mt-3">
                                                <li>
                                                    <span className="title">Employee ID:</span>
                                                    <span className="text"><a href="#">EM-0001</a></span>
                                                </li>
                                                <li>
                                                    <span className="title">Phone:</span>
                                                    <span className="text"><a href={`tell:${user.phoneNumber}`}>{user.phoneNumber}</a></span>
                                                </li>
                                                <li>
                                                    <span className="title">Email:</span>
                                                    <span className="text"><a href={`mailto:${user.email}`}>{user.email}</a></span>
                                                </li>
                                                <li>
                                                    <span className="title">Address:</span>
                                                    <span className="text">{user.country + ',  ' + user.region}</span>
                                                </li>
                                                <li>
                                                    <span className="title">Gender:</span>
                                                    <span className="text">{user.gender}</span>
                                                </li>
                                            </ul>
                                            <button className="btn btn-outline-info btn-rounded" onClick={viewUser}><i className="fa fa-eye"></i> &nbsp;View More</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment >
    )
}
