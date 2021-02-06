import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { useHistory, Link } from 'react-router-dom'
import StatusFormatter from '../../Gadgets/StatusFormatter'
import { useAlert } from 'react-alert'
// import Switch from '@material-ui/core/Switch';

// import { setAvatar } from '../../AccessoryFunctions/avatarGenerator'
// import userImg from './user.jpg'
import userImg from '../../Assets/images/user.jpg'
import { AppContext } from '../../services/AppContext'
import DeleteUser from './DeleteUser'

export default function UserProfile(props) {
    const { dispatch } = React.useContext(AppContext)
    let setBreadcrumbPath = path => dispatch({ type: 'breadcrumbPath', payload: path })
    const [loading, setLoading] = useState(false)
    const [userStatusChangeLoading, setUserStatusChangeLoading] = useState(false)
    useEffect(() => {
        setBreadcrumbPath([
            { name: 'Users', url: '/users' },
            { name: 'Profile' },
        ])
    }, [])
    const alert = useAlert()

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [userToDelete, setUserToDelete] = useState()

    function promptUserDelete(e) {
        setUserToDelete(e.target)
        handleShow()
    }

    var imgStyle = {
        height: '39vh',
        width: '100%',
        objectFit: 'cover'//none
    }

    const hist = useHistory()

    const [user, setUser] = useState({ loading: true, data: {} })
    const [requestSummary, setRequestSummary] = useState({ loading: true, data: [] })

    const userId = props.location.state;
    // const userId = props.location.userId || props.location.state;
    async function fetchUserById() {
        await axios.get(`/user/${userId}`)
            .then(response => {
                setUser({ loading: false, data: response.data.data })
            }).catch(error => {
                setUser({ loading: false, data: {} })
                console.log('error', error.response)
            })
    }
    async function fetchRequestsByUserId() {
        await axios.get(`/requests/user/${userId}`)
            .then(response => {
                let summary = [];
                response.data.data.forEach(usrRequest => {
                    let { amount, description, createdAt, _id } = usrRequest;
                    let budgetItem = usrRequest.budgetItemId;
                    const status = usrRequest.status
                    const finalData = {
                        amount, description, createdAt, budgetItem, status, _id
                    }
                    summary.push(finalData)
                })
                setRequestSummary({ loading: false, data: summary })
            })
            .catch(error => {
                setRequestSummary({ loading: false, data: [] })
                console.log('error', error.response)
            })
    }
    async function sendUserInvitation() {
        setLoading(true)
        await axios.patch(`user/invite`, {
            firstName: user.data.firstName,
            lastName: user.data.firstName,
            email: user.data.email
        }).then(response => {
            setLoading(false)
            user.data.invited = response.data.data.invited;
            setUser({ loading: false, data: user.data })
            alert.info(response.data.data.response.message)
        }).catch(error => {
            setLoading(false)
            // alert.error(error.response.message)
            console.log(error.response)
        })

    }

    async function toggleUserAprovalStatus() {
        let status = user.data.aproved === 0 ? 1 : 0
        setUserStatusChangeLoading(true)
        await axios.patch(`user/aprovalStatus/${user.data._id}/${status}`)
            .then(response => {
                setUserStatusChangeLoading(false)
                alert.info(response.data.message)
                user.data.aproved = response.data.data
                setUser({ loading: false, data: user.data })
            }).catch(error => {
                setUserStatusChangeLoading(false)
                // alert.error(error.response.message)
                console.log(error.response)
            })

    }
    useEffect(() => {
        fetchUserById();
        fetchRequestsByUserId();
    }, [])

    return (
        <React.Fragment>
            <h4 className="page-title">User Profile</h4>
            <div className="row">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <div className="card shadow-sm">
                        <div className="card-body p-0" style={{ height: '39vh' }}>
                            <img style={imgStyle} className='' srcSet={`${userImg} 1.5x`} alt="userimg" />
                        </div>

                        {user.loading ?
                            <div className='pt-4 pb-4 pl-1 text-default'>
                                <div className="spinner-border spinner-border-sm"></div> Please Wait...
                            </div>
                            :
                            <>
                                <div className="top d-inline pt-3 ml-3">
                                    <span className="text-dark p-0" style={{ fontSize: '20px' }}> {user.data.firstName + ' ' + user.data.lastName}</span> &nbsp;  <Link to={{ pathname: 'edit', state: { user: user.data } }}><i className="fa fa-pencil"></i></Link>
                                    <div className="float-right mr-1">
                                        <StatusFormatter status={user.data.aproved + 20} />
                                    </div><br />
                                    <span className="text-dark mt--5" >{user.data.role.name}</span>
                                    {/* <div className="float-right mr-1">
                                        <span className="badge badge-primary rounded-pill pt-2 pb-2 pl-3 pr-3" style={{ cursor: 'pointer' }} onClick={() => hist.push('edit', { user: user.data })}>
                                            <i className="fa fa-pencil"></i> EDIT</span>
                                        <span className="badge badge-warning rounded-pill pt-2 pb-2 pl-3 pr-3 text-white ml-2" style={{ cursor: 'not-allowed' }}>
                                            <i className="fa fa-trash"></i> DELETE</span>
                                    </div> */}
                                </div>
                                {user.data.firstTimeLoginStatus === 0 &&
                                    <div className="ml-3 mt-3 mr-1 text-danger">
                                        {/* Send Invitation to User */}
                                        User hasn't logged in
                                        {loading ?
                                            <span className="badge badge-primary rounded-pill pt-2 pb-2 pl-3 pr-3 ml-4" >
                                                <span className="spinner-border spinner-border-sm"></span>
                                                &nbsp; Sending ...
                                            </span>
                                            :
                                            <span className="badge badge-primary rounded-pill pt-2 pb-2 pl-3 pr-3 ml-4" style={{ cursor: 'pointer' }} onClick={sendUserInvitation}>
                                                <i className="fa fa-inbox"></i> SEND INVITATION
                                            </span>
                                        }
                                    </div>
                                }
                                <div className="mt-4 ml-3">
                                    <p className='' >
                                        <i className="fa fa-phone"></i>
                                        <span className="border-bottom ml-3 pr-5 d-inline-block" style={{ fontSize: '15px', width: '80%' }}>
                                            <a href={`tell:${user.data.phoneNumber}`}>{user.data.phoneNumber}</a>
                                        </span>
                                    </p>
                                    <p className='' >
                                        <i className="fa fa-envelope-o"></i>
                                        <span className="border-bottom ml-3 pr-5 d-inline-block" style={{ fontSize: '15px', width: '80%' }}>
                                            <a href={`mailto:${user.data.email}`}>{user.data.email}</a>
                                        </span>
                                    </p>
                                    <p className='' >
                                        <i className="fa fa-address-card-o"></i>
                                        <span className="border-bottom ml-3 pr-5 d-inline-block" style={{ fontSize: '15px', width: '80%' }}>
                                            {user.data.country + ',  ' + user.data.region}
                                        </span>
                                    </p>
                                    <p className='' >
                                        <i className="fa fa-female"></i>
                                        <span className="border-bottom ml-3 pr-5 d-inline-block" style={{ fontSize: '15px', width: '80%' }}>
                                            {user.data.gender}
                                        </span>
                                    </p>
                                    <p className='' >
                                        <i className="fa fa-user-plus"></i>
                                        <span className="border-bottom ml-3 pr-5 d-inline-block" style={{ fontSize: '15px', width: '80%' }}>{user.data.createdAt}</span>
                                    </p>
                                </div>

                                <span className="text-center mt-4 pb-2">
                                    last seen 7 days ago
                                </span>
                            </>
                        }
                    </div>
                </div>
                {/* col-12 col-sm-8 col-md-6 col-xl-4 */}
                <div className="col-12 col-sm-8 col-md-6 col-xl-7">
                    <div className="row">
                        <div className="col-12 col-xl-6">
                            <div className="dash-widget shadow-sm">
                                <span className={`dash-widget-bg1 bg-info`}><i className={`fa fa-money`} aria-hidden="true"></i></span>
                                <div className="dash-widget-info text-right">
                                    <h3 className=''>{requestSummary.data.length}</h3>
                                    Total Requests
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-xl-6">
                            <div className="dash-widget shadow-sm">
                                <span className={`dash-widget-bg1 bg-info`}><i className={`fa fa-dollar`} aria-hidden="true"></i></span>
                                <div className="dash-widget-info text-right">
                                    <h3 className=''>
                                        Tsh {requestSummary.data.length !== 0 && requestSummary.data.reduce((a, b) => a + b.amount, 0).toLocaleString() || 0}
                                    </h3>
                                    Total Amount Requested
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="card">
                                <div className="card-body">
                                    <ul className="nav nav-tabs nav-tabs-bottom">
                                        <li className="nav-item"><a className="nav-link active" href="#history-tab" data-toggle="tab">REQUEST HISTORY</a></li>
                                        {/* <li className="nav-item"><a className="nav-link" href="#statistics-tab" data-toggle="tab">STATISTICS</a></li> */}
                                        <li className="nav-item"><a className="nav-link" href="#activity-tab" data-toggle="tab">ACTIVITY / LOGS</a></li>
                                        <li className="nav-item"><a className="nav-link" href="#settings-tab" data-toggle="tab">MANAGE USER</a></li>
                                    </ul>
                                    <div className="tab-content histt">
                                        <div className="tab-pane show active" id="history-tab" style={{ maxHeight: '60vh', overflowX: 'hidden', overflowY: 'auto' }}>
                                            {requestSummary.loading ?
                                                <>
                                                    <div className="spinner-border spinner-border-sm"></div> Please Wait...
                                                </>
                                                :
                                                <>
                                                    {requestSummary.data.length == 0 ?
                                                        <div className='pl-3 pt-3 pb-1 text-uppercase'>No record found</div>
                                                        :
                                                        requestSummary.data.map((item, index) => {
                                                            return (
                                                                <div className="card-box pt-1 pb-1" key={index}>
                                                                    <div className="d-flex justify-content-between">
                                                                        <span className='text-dark' style={{ fontSize: '15px' }}>{item.amount.toLocaleString()} {item.budgetItem.name + ' ' + item.budgetItem.code}</span>
                                                                        <StatusFormatter status={item.status} />
                                                                    </div>
                                                                    <p className="text-truncate text-muted pt-1">
                                                                        {item.description}
                                                                    </p>
                                                                    {props.location.state.requestId}
                                                                    <Link to={{ pathname: '../request/profile', state: { requestId: item._id } }} className="badge badge-primary rounded-pill pt-2 pb-2 pl-4 pr-4" style={{ cursor: 'pointer' }}>
                                                                        VIEW</Link>
                                                                    <span className="badge badge-warning rounded-pill pt-2 pb-2 pl-4 pr-4 text-white ml-2" style={{ cursor: 'not-allowed' }}>
                                                                        DELETE</span>
                                                                    <span className='float-right'>{moment(item.createdAt).fromNow()}</span>
                                                                </div>
                                                            )
                                                        })}
                                                </>
                                            }
                                        </div>
                                        <div className="tab-pane" id="settings-tab">
                                            Edit User:
                                            <span className="badge badge-primary rounded-pill pt-2 pb-2 pl-3 pr-3 mb-1" style={{ cursor: 'pointer' }} onClick={() => hist.push('edit', { user: user.data })}>
                                                <i className="fa fa-pencil"></i> EDIT
                                            </span><br />
                                            Delete User:
                                            <span
                                                className="badge badge-warning rounded-pill pt-2 pb-2 pl-3 pr-3 mb-1 text-white ml-2"
                                                userid={user.data._id} username={user.data.firstName + ' ' + user.data.lastName}
                                                style={{ cursor: 'pointer' }}
                                                onClick={(e) => promptUserDelete(e)}>

                                                <i className="fa fa-trash"></i> DELETE
                                            </span><br />
                                            {/* <div className="dropdown-item" style={{ cursor: 'pointer' }} onClick={(e) => promptUserDelete(e)}><i className="fa fa-trash-o m-r-5"></i> Delete</div> */}

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
                                            {user.data.aproved === 1 ?
                                                <>
                                                    Deactivate User:
                                                    {userStatusChangeLoading ?
                                                        <span className="badge badge-default rounded-pill pt-2 pb-2 pl-3 pr-3 mb-1">
                                                            <span className="spinner-border spinner-border-sm"></span> Please wait ...
                                                        </span>
                                                        :
                                                        <span className="badge badge-default rounded-pill pt-2 pb-2 pl-3 pr-3 mb-1" style={{ cursor: 'pointer' }} onClick={toggleUserAprovalStatus} >
                                                            <i className="fa fa-ban"></i> DEACTIVATE
                                                        </span>
                                                    }
                                                </>
                                                :
                                                <>
                                                    Activate User:
                                                    {userStatusChangeLoading ?
                                                        <span className="badge badge-default rounded-pill pt-2 pb-2 pl-3 pr-3 mb-1">
                                                            <span className="spinner-border spinner-border-sm"></span> Please wait ...
                                                        </span>
                                                        :
                                                        <span className="badge badge-default rounded-pill pt-2 pb-2 pl-3 pr-3 mb-1" style={{ cursor: 'pointer' }} onClick={toggleUserAprovalStatus}>
                                                            <i className="fa fa-check"></i> ACTIVATE
                                                        </span>
                                                    }
                                                </>
                                            }
                                        </div>
                                        <div className="tab-pane" id="activity-tab">
                                            Activity coming soon
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </React.Fragment>
    )
}
