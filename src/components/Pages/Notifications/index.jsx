import React, { useEffect } from 'react'

export default function Index() {
    useEffect(() => {
        const data = new FormData()
        fetch('http://localhost:8080/notify', {
            method: 'POST',
            body: data
        }).then(response => {
            console.log(response)
        })
    }, [])
    return (
        <React.Fragment>
            notify me
        </React.Fragment>
    )
}

// import Notifications from './Notifications'

// export default Notifications