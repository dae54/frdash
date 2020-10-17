import React from 'react'

export default function MessagesHandler(props) {
    console.log(props)
    const { status, message } = props.message


    /**
     * status:(warning info danger)
     */
    return (
        <React.Fragment>
            <div className={`alert alert-${status} alert-dismissible fade show`} role="alert">
                {message}.
                {/* {dismissible &&
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                } */}
            </div>
        </React.Fragment>
    )
}
