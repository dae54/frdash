import React, { useState, useEffect } from 'react'
import axios from 'axios'
import URL from '../../../URL'
import { useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert'

import MessagesHandler from '../../Gadgets/MessagesHandler';
import { AppContext } from '../../services/AppContext';
export default function UpdateUser() {
    const { state, dispatch } = React.useContext(AppContext)
    let setBreadcrumbPath = path => dispatch({ type: 'breadcrumbPath', payload: path })

    useEffect(() => {
        setBreadcrumbPath([
            { name: 'Users', url: '/users' },
            { name: 'Edit User' },
        ])
    }, [])

    const hist = useHistory();
    const alert = useAlert()

    // hook to use when edit user is fired from edit dropdown in user list
    // const [editUser, setEditUser] = useState({})

    // hist.location.state.user => user details obtained when edit user is fired from user profile
    // var user = hist.location.state.user || editUser

    const [user, setUser] = useState({})

    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [email, setEmail] = useState()
    const [phoneNumber, setPhoneNumber] = useState()
    const [country, setCountry] = useState()
    const [region, setRegion] = useState()
    const [district, setDistrict] = useState()
    const [ward, setWard] = useState()
    const [gender, setGender] = useState()
    const [role, setRole] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const [roles, setRoles] = useState({ loading: true, data: [] })

    useEffect(() => {
        if (typeof user.email !== "undefined") {
            setFirstName(user.firstName); setLastName(user.lastName); setEmail(user.email); setPhoneNumber(user.phoneNumber)
            setCountry(user.country); setRegion(user.region); setDistrict(user.district); setWard(user.ward); setGender(user.gender)
            setRole(user.role._id);
        }
    }, [user])

    // FETCH ROLES
    async function fetchRoles() {
        axios.get(`${URL}/accessControl/roles`, {
        }).then((response) => {
            setRoles({ loading: false, data: response.data.data })
        }).catch((error) => {
            setRoles({ loading: false, data: [] })
            console.log(error.response)
            // alert.error(error.response)

        })
    }

    // FETCH USER DETAILS INCASE edit user is fired from USER LIST dropdown item
    async function fetchUser() {
        setIsLoading(true)
        await axios.get(`${URL}/user/${hist.location.state.userId}`, {
        }).then((response) => {
            setUser(response.data.data)
            setIsLoading(false)
        }).catch((error) => {
            setIsLoading(false)
            console.log(error.response)
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        if (role === '0') {
            return alert.error('Please assign ROLE to user')
        }
        const updatedUser = { firstName, lastName, email, phoneNumber, gender, country, ward, region, district, userId: user._id, roleId: role }
        await axios.post(`${URL}/user/edit`, {
            updatedUser
        }).then(response => {
            alert.success(response.data.message)
            console.log(response.data)
        }).catch(error => {
            // alert.error(error.response.message)
            console.log(error.response)
        })
        console.log('submit')
    }

    useEffect(() => {
        console.log(hist.location.state)
        hist.location.state.user ? setUser(hist.location.state.user) : fetchUser()
        fetchRoles()
    }, [setUser])

    return (
        <React.Fragment>
            <div className="row">
                <div className="col-lg-8 offset-lg-2">
                    <div className="row">
                        <div className="col-sm-4 col-3">
                            <h4 className="page-title">Personal details</h4>
                        </div>
                        <div className="col-sm-8 col-9 text-right m-b-20">
                            <div className="btn btn-outline-primary btn-rounded float-right" onClick={() => hist.goBack()}>
                                <i className="fa fa-caret-square-o-left"></i> Back
                            </div>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-12 col-12 col-lg-12">
                                {/* <h4 className="card-title">Personal details</h4> */}
                                <div className="form-group row">
                                    <label className="col-lg-3 col-form-label">Name:</label>
                                    <div className="col-lg-9">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <input type="text" className="form-control" placeholder="First Name" name='firstName' value={firstName} onChange={e => setFirstName(e.target.value)} required />
                                            </div>
                                            <div className="col-md-6">
                                                <input type="text" className="form-control" placeholder="Last Name" name='lastName' value={lastName} onChange={e => setLastName(e.target.value)} required />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-3 col-form-label">Email:</label>
                                    <div className="col-lg-9">
                                        <input type="email" className="form-control" placeholder="Email" name='email' value={email} onChange={e => setEmail(e.target.value)} required />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-3 col-form-label">Phone:</label>
                                    <div className="col-lg-9">
                                        <input type="number" className="form-control" name='phoneNumber' placeholder="Phone Number" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} required />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-3 col-form-label">Role:</label>
                                    <div className="col-lg-9">
                                        <select className='form-control' value={role} onChange={(e) => setRole(e.target.value)} required>
                                            <option value={0}>...</option>
                                            {roles.data.length &&
                                                roles.data.map((item, index) => {
                                                    return (
                                                        <option key={index} value={item._id}>{item.name} ({item.description})</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-3 col-form-label">Gender:</label>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="gender" value='male' checked={gender === 'male'} onChange={e => setGender(e.target.value)} required />
                                        <label className="form-check-label" >Male</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="gender" value='female' checked={gender === 'female'} onChange={e => setGender(e.target.value)} required />
                                        <label className="form-check-label" >Female</label>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-3 col-form-label">Physical Address:</label>
                                    <div className="col-lg-9">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="m-b-20">
                                                    <select className="select form-control" value={country} onChange={e => setCountry(e.target.value)}>
                                                        <option>Select country</option>
                                                        <option value="Tanzania">Tanzania</option>
                                                    </select>
                                                </div>
                                                <input type="text" className="form-control" placeholder="Region" name='region' value={region} onChange={e => setRegion(e.target.value)} required />
                                            </div>
                                            <div className="col-md-6">
                                                <input type="text" className="form-control m-b-20" placeholder="District" name='district' value={district} onChange={e => setDistrict(e.target.value)} required />
                                                <input type="text" className="form-control" placeholder="Ward" name='ward' value={ward} onChange={e => setWard(e.target.value)} required />

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {roles.loading || isLoading?
                            <div className="text-right">
                                <button className="btn btn-primary" disabled>
                                    <div>
                                        <div className="spinner-border text-light spinner-border-sm " role="status">
                                            <span className="sr-only">Please Wait...</span>
                                        </div>
                                &nbsp;Please Wait...
                                </div>
                                </button>
                            </div>
                            :
                            <div className="text-right">
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        }
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}