import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { useHistory, Link } from 'react-router-dom'
import StatusFormatter from '../../Gadgets/StatusFormatter'

// import { setAvatar } from '../../AccessoryFunctions/avatarGenerator'
// import userImg from './user.jpg'
import userImg from '../../Assets/images/user.jpg'
import { AppContext } from '../../services/AppContext'

export default function UserProfile(props) {
    const { state, dispatch } = React.useContext(AppContext)
    let setBreadcrumbPath = path => dispatch({ type: 'breadcrumbPath', payload: path })

    useEffect(() => {
        setBreadcrumbPath([
            { name: 'Users', url: '/users' },
            { name: 'Profile' },
        ])
    }, [])

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
    useEffect(() => {
        fetchUserById();
        fetchRequestsByUserId();
    }, [])

    return (
        <React.Fragment>
            <h4 className="page-title">User Profile</h4>
            <div className="row">
                <div className="col-3">
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
                                    <span className="text-dark p-0" style={{ fontSize: '20px' }}> {user.data.firstName + ' ' + user.data.lastName}</span> <br />
                                    <span className="text-dark mt--5" >{user.data.role.name}</span>
                                    <div className="float-right mr-1">
                                        <span className="badge badge-primary rounded-pill pt-2 pb-2 pl-3 pr-3" style={{ cursor: 'pointer' }} onClick={() => hist.push('edit', { user: user.data })}>
                                            <i className="fa fa-pencil"></i> EDIT</span>
                                        <span className="badge badge-warning rounded-pill pt-2 pb-2 pl-3 pr-3 text-white ml-2" style={{ cursor: 'not-allowed' }}>
                                            <i className="fa fa-trash"></i> DELETE</span>
                                    </div>
                                </div>
                                {!user.invitationEmail &&
                                    <div className="ml-3 mt-3 mr-1 text-danger">
                                        Invitation Email not sent
                                <span className="badge badge-primary rounded-pill pt-2 pb-2 pl-3 pr-3 ml-4" style={{ cursor: 'pointer' }} onClick={() => { }}>
                                            <i className="fa fa-inbox"></i> SEND NOW
                                </span>
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
                <div className="col-6">
                    <div className="row">
                        <div className="col-6">
                            {/* <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3"> */}
                            <div className="dash-widget shadow-sm">
                                <span className={`dash-widget-bg1 bg-info`}><i className={`fa fa-money`} aria-hidden="true"></i></span>
                                <div className="dash-widget-info text-right">
                                    <h3 className=''>
                                        20
                                </h3>
                                10 aproved 5 pending 5 disbursed
                            </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="dash-widget shadow-sm">
                                <span className={`dash-widget-bg1 bg-info`}><i className={`fa fa-money`} aria-hidden="true"></i></span>
                                <div className="dash-widget-info text-right">
                                    <h3 className=''>
                                        20
                                </h3>
                                10 aproved 5 pending 5 disbursed
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
                                        <li className="nav-item"><a className="nav-link" href="#activity-tab" data-toggle="tab">ACTIVITY</a></li>
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
                                                            console.log(item)
                                                            return (
                                                                <div className="card-box pt-1 pb-1" key={index}>
                                                                    <div className="d-flex justify-content-between">
                                                                        <span className='text-dark' style={{ fontSize: '15px' }}>{item.amount.toLocaleString()} {item.budgetItem.name + ' ' + item.budgetItem.code}</span>
                                                                        {/* <div className="badge badge-primary rounded-0 pt-2 pb-1">PENDING</div> */}
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
                                                // :
                                                // <div className="btn btn-default text-white  pl-5 pr-5 pt-3 pb-3">
                                                // <>
                                                //     <div className="spinner-border spinner-border-sm"></div> Please Wait...
                                                // </>
                                                // {/* </div> */}
                                            }
                                            {/* {Array.from({ length: 5 }, () => {
                                                return (
                                                    <div className="card-box pt-1 pb-1">
                                                        <div className="d-flex justify-content-between">
                                                            <span className='text-dark' style={{ fontSize: '15px' }}>15000 Shelter SH112</span>
                                                            <div className="badge badge-primary rounded-0 pt-2 pb-1">PENDING</div>
                                                        </div>
                                                        <p className="text-truncate text-muted pt-1">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                                        Nostrum voluptates iusto libero nesciunt ducimus, alias voluptas, esse exercitationem,
                                                        </p>
                                                        <span className="badge badge-primary rounded-pill pt-2 pb-2 pl-4 pr-4" style={{ cursor: 'pointer' }}>
                                                            VIEW</span>
                                                        <span className="badge badge-warning rounded-pill pt-2 pb-2 pl-4 pr-4 text-white ml-2" style={{ cursor: 'pointer' }}>
                                                            DELETE</span>

                                                    </div>
                                                )
                                            })} */}
                                        </div>
                                        <div className="tab-pane" id="statistics-tab">
                                            Activity coming soon
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
