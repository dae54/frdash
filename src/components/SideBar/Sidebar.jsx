import React from 'react'
import menu from './index'
import { NavLink } from "react-router-dom";

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
    return (
        <>
            {!item.submenu &&
                <li className={item.status}>
                    <NavLink to={item.link}>
                        <i className={`fa fa-${item.icon}`}></i>
                        <span>{item.name}</span>
                    </NavLink>
                </li>
            }
            {item.submenu &&
                <li className='submenu' key={index}>
                    <NavLink to='#'>
                        <i className={`fa fa-${item.icon}`}></i>
                        <span>{item.name}</span>
                        <span className="menu-arrow"></span>
                    </NavLink>
                    <ul style={{ "display": "none" }}>
                        {item.submenu.map((subItem, index) => {
                            return (
                                <li className={subItem.status} key={index}>
                                    <NavLink to={subItem.link}>
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