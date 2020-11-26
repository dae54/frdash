import React from 'react'
import InfoCard from '../../Gadgets/InfoCard'

export default function Statistics({ statistics }) {
    const { pendingRequestsCount, pendingAmount } = statistics.pendingRequests;
    const { requestsOnHold, onHoldAmount } = statistics.requestsOnHold;
    const { count, mostRequestedBudgetItem } = statistics.mostRequestedBudgetItem
    const stats = [{
        icon: 'stethoscope',
        label: 'Pending Requests',
        amount: 'TSh ' + pendingAmount,
        count: pendingRequestsCount,
        color: 'primary'
    }, {
        icon: 'user-o',
        label: 'Requests On Hold',
        amount: 'TSh ' + onHoldAmount,
        count: requestsOnHold,
        color: 'success'
    }, {
        icon: 'user-md',
        label: 'Most requested item',
        amount: mostRequestedBudgetItem,
        count: count,
        color: 'secondary'
    }]
    return (
        <React.Fragment>
            {stats.map((item, index) => {
                return (<InfoCard key={index} item={item} />)
            })}
        </React.Fragment>
    )
}
