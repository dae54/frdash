import React, { useState, useEffect } from 'react'
import menu from './index'
import { NavLink } from "react-router-dom";
import { AuthContext } from '../Auth/AuthContext'
import { canAddUser, canEditRequests } from '../utilities/PemissionManager'
// import expandSidebar from './expandSidebar';


export default function Sidebar() {
    useEffect(() => {
        // expandSidebar()
        // $(document).on('click', '#mobile_btn', function() {
        //     var $target = $($(this).attr('href'));
        //     sidebar_overlay($target);
        //     $wrapper.toggleClass('slide-nav');
        //     $('#chat_sidebar').removeClass('opened');
        //     return false;
        // });
        // code to run on component mount
    }, [])
    // console.log(canAddUser())
    // console.log(canEditRequests)
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
    const [display, setDisplay] = useState('none')
    // const handleOpenSubMenu = () => {

    // }
    return (
        <>
            {!item.submenu ?
                <>
                    <li className='ulos'>
                        <NavLink to={item.link}>
                            <i className={`fa fa-${item.icon}`}></i>
                            <span>{item.name}</span>
                        </NavLink>
                    </li>
                </>
                :
                <>
                    <li className='submenu' key={index} onClic={() => setDisplay(display === 'none' ? 'block' : 'none')}>
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

                        <ul style={{ "display": 'none' }} >
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
                </>
            }
        </>
    )
}

function Can({ permission, component }) {
    const { state } = React.useContext(AuthContext)
    if (state.currentUser === '') {
        return ''
    } else {
        if (state.currentUser.role.permission.some(perm => (perm.moduleName === permission.moduleName && perm.genericName === permission.genericName)))
            return component
        else return ''
    }
}

function CanGlobal(permission) {
    const { state } = React.useContext(AuthContext)
    if (state.currentUser === '') {
        return 'none'
    } else {
        if (permission.length === 0)
            return ''
        for (let i = 0; i < permission.length; i++) {
            // if (state.currentUser.role.permission.some(perm => perm.genericName === permission[i])) {
            if (state.currentUser.role.permission.some(perm => perm.genericName === permission[i])) {
                return ''
            }
            // else return 'none'
        }
        return 'none'
    }
}

// function CanGlobal({ permission, component }) {
//     const { state } = React.useContext(AuthContext)
//     if (state.currentUser === '') {
//         return ''
//     } else {
//         // for (let i = 0; i < permission.length; i++) {
//         if (state.currentUser.role.permission.some(perm => (perm.genericName === permission[0])))
//             return component
//         else return ''
//         // }
//     }
// }