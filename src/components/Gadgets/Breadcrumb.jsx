import React from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../services/AppContext'

export default function Breadcrumb({ routes }) {
    const { state, dispatch } = React.useContext(AppContext)
    console.log(state.breadcrumbPath)


    return (
        <React.Fragment>
            <nav aria-label="breadcrumb" className='float-left pt-1'>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <Link to="" > <i className="fa fa-home"></i> Dashboard</Link>
                    </li>
                    {state.breadcrumbPath.map((route, index) => {
                        return (
                            // state.breadcrumbPath[state.breadcrumbPath.length - 1].path === '/' ?
                            // route.active ?
                            state.breadcrumbPath[state.breadcrumbPath.length - 1].url !== route.url ?
                                <li class="breadcrumb-item">
                                    <Link to={route.url} >
                                        {route.name}
                                    </Link>
                                </li>
                                :
                                <li class="breadcrumb-item active" aria-current="page">{route.name}</li> 

                            // <li class="breadcrumb-item">
                            //     <Link to="" > <i className="fa fa-home"></i> Home</Link>
                            // </li>
                            // :
                            // <li class="breadcrumb-item">
                            //     <Link to="" >Home</Link>
                            // </li>



                            // <li class="breadcrumb-item">
                            //     <Link to="" > <i className="fa fa-home"></i> Home</Link>
                            // </li>
                        )
                    })}
                    {/* <li class="breadcrumb-item">
                        <Link to="" > <i className="fa fa-home"></i> Home</Link>
                    </li>
                    <li class="breadcrumb-item">
                        <Link to="" >Library</Link>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">Data</li> */}
                </ol>
            </nav>
        </React.Fragment>
    )
}
