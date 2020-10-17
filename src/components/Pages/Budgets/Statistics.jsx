import React, { useState } from 'react'
import InfoCard from '../../Gadgets/InfoCard'

export default function Statistics(props) {
    const info = [
        {
            icon: 'stethoscope',
            label: 'Current Budget',
            amount: props.activeBudget.name.replace(props.activeBudget.name.charAt(0),props.activeBudget.name.charAt(0).toUpperCase()),
            color: 'primary'
        },
        // {
        //     icon: 'user-o',
        //     label: 'Current Budget Start Date',
        //     amount: "1074Tsh",
        //     color: 'success'
        // },
        // {
        //     icon: 'user-md',
        //     label: 'Total Requests',
        //     amount: 1200,
        //     count:77,
        //     color: 'secondary'
        // },
        // {
        //     icon: 'heartbeat',
        //     label: 'Total',
        //     amount: 41,
        //     color: 'warning'
        // },
    ]

    return (
        <React.Fragment>
            {props.activeBudget ?
                <>
                    {info.map((item, index) => {
                        return (<InfoCard key={index} item={item} />)
                    })}
                </>
                :
                <></>
            }

        </React.Fragment>
    )
}
