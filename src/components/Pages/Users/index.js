import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import axios from 'axios'

// import URL from '../../../URL'
import Users from './Users'

export default function Index() {
    const [userList, setUserList] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    async function fetchUser() {
        setIsLoading(true)
        await axios.get('/user')
            .then(response => {
                setUserList(response.data.data)
                setIsLoading(false)
            })
            .catch(error => {
                setIsLoading(false)
                console.error(error.response);
                console.log('error')
            })
    }
    useEffect(() => {
        fetchUser();
    }, [])
    return (
        <React.Fragment>
            <div className="row">
                <div className="col-sm-4 col-3">
                    <h4 className="page-title">Users</h4>
                </div>
                <div className="col-sm-8 col-9 text-right m-b-20">
                    <NavLink className="btn btn-primary btn-rounded float-right" to={{ pathname: 'users/add' }}>
                        <i className="fa fa-plus"></i> Add User
                    </NavLink>
                </div>
            </div>
            {isLoading ?
                <div className='row'>
                    {Array.from({ length: 8 }, () => {
                        return (
                            <div className='col-3'>
                                <div className='jumbotron blink_me'></div>
                            </div>
                        )
                    })}
                </div>
                :
                <div className="row doctor-grid">
                    {userList.map((item, index) => {
                        return (<Users key={index} user={item} userList={userList} setUserList={setUserList} />)
                    })}
                </div>
            }

        </React.Fragment>
    )
}
