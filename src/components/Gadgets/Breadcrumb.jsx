import React from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../services/AppContext'

export default function Breadcrumb() {
    const { state } = React.useContext(AppContext)
    
    return (
        <React.Fragment>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="" > <i className="fa fa-home"></i> Dashboard</Link>
                    </li>
                    {state.breadcrumbPath.map((route, index) => {
                        return (
                            // state.breadcrumbPath[state.breadcrumbPath.length - 1].path === '/' ?
                            // route.active ?
                            state.breadcrumbPath[state.breadcrumbPath.length - 1].url !== route.url ?
                                <li className="breadcrumb-item" key={index}>
                                    <Link to={route.url} >
                                        {route.name}
                                    </Link>
                                </li>
                                :
                                <li className="breadcrumb-item active" aria-current="page" key={index}>{route.name}</li>

                            // <li className="breadcrumb-item">
                            //     <Link to="" > <i className="fa fa-home"></i> Home</Link>
                            // </li>
                            // :
                            // <li className="breadcrumb-item">
                            //     <Link to="" >Home</Link>
                            // </li>



                            // <li className="breadcrumb-item">
                            //     <Link to="" > <i className="fa fa-home"></i> Home</Link>
                            // </li>
                        )
                    })}
                    {/* <li className="breadcrumb-item">
                        <Link to="" > <i className="fa fa-home"></i> Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to="" >Library</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Data</li> */}
                </ol>
            </nav>
        </React.Fragment>
    )
}
