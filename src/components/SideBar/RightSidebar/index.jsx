import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { setAvatar } from '../../AccessoryFunctions/avatarGenerator'
import { AuthContext } from '../../Auth/AuthContext'
import { AppContext } from '../../services/AppContext'
import { logout } from '../../Auth/sessionControl'
import './style.css'

export default function RightSidebar() {
    const hist = useHistory()
    const rightSidebarOverlayOpened = useContext(AppContext)
    const { state, dispatch } = React.useContext(AuthContext)

    let setIsAuthorized = isAuthorized => dispatch({ type: 'isAuthorized', payload: isAuthorized })
    let setIsLocked = isLocked => dispatch({ type: 'isLocked', payload: isLocked })

    let setOverlayOff = () => rightSidebarOverlayOpened.dispatch({ type: 'rightSidebarOverlayOpened', payload: false })


    function handleLogout() {
        const logoutConfirm = window.confirm('You are about to be logged out, Proceed?')
        if (logoutConfirm) {
            const loggedOut = logout()
            if (loggedOut) {
                setIsAuthorized(false)
                window.location.replace('/login')
            }
        }
    }

    function lock() {
        sessionStorage.setItem('pathname', hist.location.pathname)
        sessionStorage.setItem('state', JSON.stringify(hist.location.state || ''))
        localStorage.removeItem('token')

        setIsLocked(true)
    }

    return (
        <React.Fragment>
            {console.log(state)}
            <aside class="">
                <div id="overlay" style={{ display: `${rightSidebarOverlayOpened.state.rightSidebarOverlayOpened ? 'block' : 'none'}` }}>
                    <div className=''>
                        <div className="jumbotron bg-white shadow mb-0 pt-4">
                            <div className="text-center">
                                <span className="user-img mb-4">
                                    <span className="avatar bg-default">
                                        {/* 9d7878 */}
                                        {setAvatar(state.userDetails.firstName, state.userDetails.lastName)}
                                    </span>
                                </span><br />
                                <span className='text-dark font-weight-bold' style={{ fontSize: '17px' }}>{state.userDetails.firstName + " " + state.userDetails.lastName}</span><br />
                                <span className='text-dar'>{state.userDetails.email}</span><br />

                                <Link to='/profile' onClick={setOverlayOff} className="btn btn-outline-info rounded-pill p-0 btn-block mt-3 mb-3" >Account Settings</Link>
                                <span className=''>{state.userDetails.role.name}</span>
                            </div>
                            <hr />
                            <div id="action" className='mt-'>
                                <div className="btn btn-outline-secondary btn-sm p-0 btn-block" onClick={lock}><i className="fa fa-lock"></i> Lock</div>
                                <div className="btn btn-primary btn-sm p-0 btn-block" onClick={handleLogout}><i className="fa fa-sign-out"></i> Sign Out</div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* <div style={{ "padding": "20px" }}>
                    <h2>Overlay with Text</h2>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet harum voluptate velit aliquid consectetur impedit aliquam veritatis eos at explicabo. Repellat dolorem tempora explicabo doloremque accusantium temporibus, vel quibusdam asperiores?<br />

                    <button onClick={() => setOverlay(!overlay)}>Turn on overlay effect</button>
                </div> */}
            </aside>
        </React.Fragment>
    )
}
