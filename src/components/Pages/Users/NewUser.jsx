import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SweetAlert from 'react-bootstrap-sweetalert'
import URL from '../../../URL'
import { AppContext } from '../../services/AppContext'
import { useAlert } from 'react-alert'


export default function NewUser() {
    const { state, dispatch } = React.useContext(AppContext)
    let setBreadcrumbPath = path => dispatch({ type: 'breadcrumbPath', payload: path })
    const alert = useAlert()

    useEffect(() => {
        setBreadcrumbPath([
            { name: 'Users', url: '/users' },
            { name: 'Add New User' },
        ])
    }, [])

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [country, setCountry] = useState('Tanzania')
    const [region, setRegion] = useState('')
    const [district, setDistrict] = useState('')
    const [ward, setWard] = useState('')
    const [gender, setGender] = useState('')
    const [role, setRole] = useState('')

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [message, setMessage] = useState({})

    const [roles, setRoles] = useState({ loading: true, data: [] })

    function handleSubmit(e) {
        e.preventDefault()
        if (role === '0') {
            return alert.error('Please assign ROLE to user')
            // return setError('Assign role to user')
        }
        setIsLoading(true)
        setError('')
        console.log(role)

        const newUser = { firstName, lastName, email, phoneNumber, country, region, district, ward, gender, role }
        axios.post(`${URL}/user/register`, {
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            newUser
        }).then((response) => {
            setIsLoading(false)
            alert.success(response.data.message)
        }).catch((error) => {
            setIsLoading(false)
            console.log(error)
            alert.error(error.response.data.userMessage)
        })
    }
    // FETCH ROLES
    async function fetchRoles() {
        axios.get(`${URL}/accessControl/roles`, {
        }).then((response) => {
            setRoles({ loading: false, data: response.data.data })
        }).catch((error) => {
            setRoles({ loading: false, data: [] })
            console.log(error.response)
        })
    }
    useEffect(() => {
        fetchRoles();
    }, [])
    // const MessagePrompt = () => {
    //     return (
    //         <SweetAlert
    //             success
    //             title="Woot!"
    //             onConfirm={() => setMessage('')}
    //         >
    //             I did it!
    //         </SweetAlert>
    //     )
    // }
    return (
        <React.Fragment>
            <div className="row">
                {message.title &&
                    <SweetAlert
                        success
                        title={`${message.title}!!`}
                        onConfirm={() => setMessage('')}>
                        {message.text}
                    </SweetAlert>
                }
                <div className="col-lg-8 offset-lg-2">
                    <h4 className="page-title">Add User</h4>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-8 offset-lg-2">
                    {error &&
                        <ErrorMessage message={error} />
                    }
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-12 col-12 col-lg-12">
                                <h4 className="card-title">Personal details</h4>
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
                                                roles.data.map(item => {
                                                    return (
                                                        <option value={item._id}>{item.name} ({item.description})</option>
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
                                                    <select className="select form-control" onChange={e => setCountry(e.target.value)}>
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
                        {roles.loading || isLoading ?
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


const ErrorMessage = (props) => {
    return (
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Warning!</strong> {props.message}.
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )
}