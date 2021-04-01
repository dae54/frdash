import React from 'react'

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
                return (
                    <div key={index} className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-3">
                        <div className={`dash-widget shadow border-left border-${item.color}`}>
                            <span className={`dash-widget-bg1 bg-${item.color}`}><i className={`fa fa-${item.icon}`} aria-hidden="true"></i></span>
                            <div className="dash-widget-info text-right">
                                <h5 className='pb-2 font-weight-bold'>{item.amount} ({item.count})</h5>
                                {item.label}
                            </div>
                        </div>
                    </div>
                    // <InfoCard key={index} item={item} />
                )
            })}
        </React.Fragment>
    )
}
