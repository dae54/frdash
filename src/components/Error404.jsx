import React from 'react'
import { Link } from 'react-router-dom'

export default function Error404() {
  return (
    <React.Fragment>
      <div className="error-box bg-light">
        <h1>404</h1>
        <h3><i className="fa fa-warning"></i> Oops! The page <br /><span className='text-info'>"{window.location.origin}{window.location.pathname}"</span> <br /> was  not found!</h3>
        <p>Consider using the left navigation pane </p>
        <Link to='/' className="btn btn-primary go-home">Go to Home</Link>
      </div>
    </React.Fragment>
  )
}
