import React, { useState } from 'react'
import menu from './index'
import { NavLink } from "react-router-dom";
import { AuthContext } from '../Auth/AuthContext'

export default function Sidebar() {
    return (
        <React.Fragment>
            <div className="sidebar" id="sidebar">
                <div className="sidebar-inner slimscroll">
                    <div id="sidebar-menu" className="sidebar-menu">
                        <ul>
                            {menu.map((item, index) => {
                                return (<SideComp item={item} index={index} key={index} />)
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

const SideComp = ({ item, index }) => {
    const [activeSubMenu, setActiveSubMenu] = useState()
    return (
        <>
            {!item.submenu ?
                <li className={item.status}>
                    <NavLink to={item.link}>
                        <i className={`fa fa-${item.icon}`}></i>
                        <span>{item.name}</span>
                    </NavLink>
                </li>
                :
                <li className='submenu' key={index}>
                    {/* {item.permission ?
                    ''
                        // console.log(item.permission)
                        // <CanGlobal
                        //     permission={item.permission}
                        //     component={
                        //         <NavLink to='#'>
                        //             <i className={`fa fa-${item.icon}`}></i>
                        //             <span>{item.name}</span>
                        //             <span className="menu-arrow"></span>
                        //         </NavLink>
                        //     } />
                        :
                        <NavLink to='#'>
                            <i className={`fa fa-${item.icon}`}></i>
                            <span>{item.name}</span>
                            <span className="menu-arrow"></span>
                        </NavLink>
                    } */}
                    <NavLink to='#' className={`d-${CanGlobal(item.permission || [])}`}>
                        <i className={`fa fa-${item.icon}`}></i>
                        <span>{item.name}</span>
                        <span className="menu-arrow"></span>
                    </NavLink>

                    <ul style={{ "display": "none" }}>
                        {item.submenu.map((subItem, index) => {
                            return (
                                subItem.permission ?
                                    <Can key={index}
                                        permission={subItem.permission}
                                        component={<li key={index} className={activeSubMenu === index ? 'active' : ''} onClick={() => setActiveSubMenu(index)}>
                                            <NavLink to={subItem.link} >
                                                <span>{subItem.name}</span>
                                            </NavLink>
                                        </li>}
                                    />
                                    :
                                    <li key={index} className={activeSubMenu === index ? 'active' : ''} onClick={() => setActiveSubMenu(index)}>
                                        <NavLink to={subItem.link} >
                                            <span>{subItem.name}</span>
                                        </NavLink>
                                    </li>

                            )
                        })}
                    </ul>
                </li>
            }
        </>
    )
}

function Can({ permission, component }) {
    const { state } = React.useContext(AuthContext)
    if (state.userDetails === '') {
        return ''
    } else {
        if (state.userDetails.role.permission.some(perm => (perm.moduleName === permission.moduleName && perm.genericName === permission.genericName)))
            return component
        else return ''
    }
}

function CanGlobal(permission) {
    const { state } = React.useContext(AuthContext)
    if (state.userDetails === '') {
        return 'none'
    } else {
        if(permission.length ===0 )
            return ''
        for (let i = 0; i < permission.length; i++) {
            // if (state.userDetails.role.permission.some(perm => perm.genericName === permission[i])) {
            if (state.userDetails.role.permission.some(perm => perm.genericName === permission[i])) {
                return ''
            }
            // else return 'none'
        }
        return 'none'
    }
}

// function CanGlobal({ permission, component }) {
//     const { state } = React.useContext(AuthContext)
//     if (state.userDetails === '') {
//         return ''
//     } else {
//         // for (let i = 0; i < permission.length; i++) {
//         if (state.userDetails.role.permission.some(perm => (perm.genericName === permission[0])))
//             return component
//         else return ''
//         // }
//     }
// }