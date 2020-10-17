import React, { useEffect, useState } from 'react'
import axios from 'axios'
import URL from '../../../URL'
import TimeLine from '../../Gadgets/TimeLine'
import { useHistory } from 'react-router-dom'
import { StatusColorFormatter } from '../../Gadgets/StatusFormatter'
import { setAvatar } from '../../AccessoryFunctions/avatarGenerator'

export default function UserProfile(props) {
    const hist = useHistory()

    const [user, setUser] = useState({})
    const [requestSummary, setRequestSummary] = useState([])
    const [loadingRequestsHist, setLoadingRequestHist] = useState(false)
    const [loadingUser, setLoadingUser] = useState(false)

    const userId = props.location.state;
    // const userId = props.location.userId || props.location.state;
    async function fetchUserById() {
        setLoadingUser(true)
        await axios.get(`/user/${userId}`)
            .then(response => {
                setLoadingUser(false)
                setUser(response.data.data)
            }).catch(error => {
                setLoadingUser(false)
                console.log('error', error.response)
            })
    }
    async function fetchRequestsByUserId() {
        setLoadingRequestHist(true)
        await axios.get(`/requests/user/${userId}`)
            .then(response => {
                setLoadingRequestHist(false)
                let summary = [];
                response.data.data.forEach(usrRequest => {
                    let { amount, description, createdAt } = usrRequest;
                    let budgetItem = usrRequest.budgetItemId;
                    const color = StatusColorFormatter(usrRequest.status)
                    const finalData = {
                        amount, description, createdAt, budgetItem, color
                    }
                    summary.push(finalData)
                })
                setRequestSummary(summary)
            })
            .catch(error => {
                setLoadingRequestHist(false)
                console.log('error', error.response)
            })
    }
    useEffect(() => {
        fetchUserById();
        fetchRequestsByUserId();
    }, [])

    return (
        <React.Fragment>
            <div class="row">
                <div class="col-sm-7 col-6">
                    <h4 class="page-title">User Profile</h4>
                </div>
                <div class="col-sm-5 col-6 text-right m-b-30">
                    <span class="btn btn-primary btn-rounded"><i class="fa fa-trash"></i> Delete User</span>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="card-box profile-header">
                        <div className="row">
                            <div className="col-md-12">
                                {loadingUser &&
                                    <div>
                                        <div className="spinner-border text-info spinner-border-sm"></div>
                                        &nbsp;Please Wait...
                                    </div>
                                }
                                <div className={`profile-view ${loadingUser ? 'blur' : ''}`}>
                                    <div className="profile-img-wrap">
                                        <div className="profile-img">
                                            <span className='avatar bg-info' style={{ fontSize: '8vh' }} >{setAvatar(user.firstName, user.lastName)}</span>
                                            {/* <img className="avatar" src="assets/img/doctor-03.jpg" alt="" /> */}
                                        </div>
                                    </div>
                                    <div className="profile-basic">
                                        <div className="row">
                                            <div className="col-md-5">
                                                <div className={`profile-info-left ${loadingUser ? 'blur' : ''}`}>
                                                    <h3 className="user-name m-t-0 mb-0 text-uppercase">{user.firstName + ' ' + user.lastName}</h3>
                                                    <small className="text-muted">Strategy Lead</small>
                                                    <div className="staff-id">Employee ID : EM-0001</div>
                                                    <div className="staff-msg">
                                                        <div className="btn btn-outline-info btn-rounded" onClick={() => hist.push('edit', { user: user })}>
                                                            <i className="fa fa-pencil"></i> Edit User
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-7">
                                                <ul className="personal-info">
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
                                                    <li>
                                                        <span className="title">Role:</span>
                                                        <span className="text">{user.roleName}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="profile-tabs">
                        <ul className="nav nav-tabs nav-tabs-bottom">
                            <li className="nav-item"><a className="nav-link active" href="#history-tab" data-toggle="tab">Request History</a></li>
                            <li className="nav-item"><a className="nav-link" href="#activity-tab" data-toggle="tab">Activity</a></li>
                        </ul>

                        <div className="tab-content">
                            <div className="tab-pane show active" id="history-tab">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="card" >
                                            <div className="card-header pb-1">
                                                <h3 className="card-title">User Requests History</h3>
                                            </div>
                                            {!loadingRequestsHist ?
                                                <>
                                                    {requestSummary.length == 0 ?
                                                        <div className='pl-3 pt-3 pb-1 text-uppercase'>No record found</div>
                                                        :
                                                        <>
                                                            <div className="card-body hist" style={{ maxHeight: 400, overflowY: 'auto', overflowX: 'hidden' }}>
                                                                <div className="experience-box" >
                                                                    <ul className="experience-list">
                                                                        {requestSummary.map((item, index) => {
                                                                            return (<TimeLine hist={item} key={index} />)
                                                                        })}
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div className="card-footer bg-white">
                                                                <span className='text-dark'>⬤</span> Pending
                                                                <span className='text-secondary ml-3'>⬤</span> OnHold
                                                                <span className='text-success ml-3'>⬤</span> Aproved
                                                                <span className='text-danger ml-3'>⬤</span> Rejected
                                                                <span className='text-primary ml-3'>⬤</span> Disbursed
                                                                <span className='text-warning ml-3'>⬤</span> Confirmed
                                                                <span className='text-danger ml-3'>⬤</span> Cancelled
                                                            </div>
                                                        </>
                                                    }
                                                </>
                                                :
                                                <div>
                                                    <div className="spinner-border text-info spinner-border-md ml-3"></div>
                                                    &nbsp;Please Wait...
                                                </div>
                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane" id="activity-tab">
                                Activity coming soon
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

// export const TimeLine = (props) => {
//     const { amount, description, budgetItem, date } = props.hist
//     return (
//         <li>
//             <div className="experience-user">
//                 <div className="before-circle bg-danger"></div>
//             </div>
//             <div className="experience-content">
//                 <div className="timeline-content">
//                     <a href="#/" className="name">{amount + ` (${budgetItem.name + ' ' + budgetItem.code})`}</a>
//                     <div>{description}</div>
//                     <span className="times">{date}</span>
//                 </div>
//             </div>
//         </li>
//     )
// }