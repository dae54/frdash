import React from 'react'
import InfoCard from '../../Gadgets/InfoCard'

export default function Statistics(props) {
    const { pendingRequestsCount, pendingAmount } = props.stats.pendingRequests;
    const { requestsOnHold, onHoldAmount } = props.stats.requestsOnHold;
    const { count, mostRequestedBudgetItem } = props.stats.mostRequestedBudgetItem
    const stats = [{
        icon: 'stethoscope',
        label: 'Pending Requests',
        amount: 'TSh '+pendingAmount,
        count: pendingRequestsCount,
        color: 'primary'
    },
    {
        icon: 'user-o',
        label: 'Requests On Hold',
        amount: 'TSh '+onHoldAmount,
        count: requestsOnHold,
        color: 'success'
    },
    {
        icon: 'user-md',
        label: 'Most requested item',
        amount: mostRequestedBudgetItem,
        count: count,
        color: 'secondary'
    },
    ]
    // const info = [
    //     {
    //         icon: 'stethoscope',
    //         label: 'Pending Requests',
    //         amount: 99,
    //         color: 'primary'
    //     },
    //     {
    //         icon: 'user-o',
    //         label: 'Disbursed Requests',
    //         amount: "1074Tsh",
    //         color: 'success'
    //     },
    //     {
    //         icon: 'user-md',
    //         label: 'Total Requests',
    //         amount: 77,
    //         color: 'secondary'
    //     },
    //     {
    //         icon: 'heartbeat',
    //         label: 'Total',
    //         amount: 41,
    //         color: 'warning'
    //     },
    // ]

    return (
        <React.Fragment>
            {stats.map((item, index) => {
                return (<InfoCard key={index} item={item} />)
            })}
        </React.Fragment>
    )
}
