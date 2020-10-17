import React, { useState } from 'react'
import {
    Route, Switch
} from "react-router-dom";

import routes from './Routes'
import Sidebar from './components/SideBar/Sidebar'
import Navbar from './components/NavBar'

export default function ProtectedRoutes() {
    return (
        <React.Fragment>
            <div className="main-wrapper">
                <Sidebar />
                <Navbar />
                <div className="page-wrapper">
                    <div className="content">
                        <Switch>
                            {routes.map((item, index) => {
                                return (
                                    <Route exact path={item.link} key={index} component={item.component} />
                                )
                            })}
                            {/* <Route component={Error4o4} /> */}
                        </Switch>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
    // } else {
    //     { return hist.push('/lock') }
    // }
}
