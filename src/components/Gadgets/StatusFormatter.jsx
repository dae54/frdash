import React from 'react'

export default function StatusFormatter(props) {
    switch (props.status) {
        case 0:
            return (
                // <div className="dash-widget-info text-righ">
                //     <span className="widget-title1 bg-warning">PENDING <i className="fa fa-check" aria-hidden="true"></i></span>
                // </div>
                // <span className="">
                //     <span className="text-white bg-warning p-2">PENDING &nbsp;
                //     <i className="fa fa-check" aria-hidden="true"></i>
                //     </span>
                // </span>
                <span className="badge badge-primary rounded-sm pt-2 pb-2 pl-3 pr-3">PENDING</span>
            )
        case 1:
            return (
                <span className="badge badge-secondary rounded-sm pt-2 pb-2 pl-3 pr-3">ONHOLD</span>

                // <span className="dash-widget-info text-righ">
                //     <span className="widget-title1 bg-secondary">ONHOLD
                //      {/* <i className="fa fa-check" aria-hidden="true"></i> */}
                //     </span>
                // </span>
            )
        case 2:
            return (
                <span className="badge badge-success rounded-sm pt-2 pb-2 pl-3 pr-3">APROVED</span>

                // <div className="dash-widget-info text-righ">
                //     <span className="widget-title1 bg-success">APROVED
                //     {/* <i className="fa fa-check" aria-hidden="true"></i> */}
                //     </span>
                // </div>
            )
        case 3:
            return (
                <span className="badge badge-dark rounded-sm pt-2 pb-2 pl-3 pr-3">REJECTED</span>

                // <div className="dash-widget-info text-righ">
                //     <span className="widget-title1 bg-dark">REJECTED
                //     {/* <i className="fa fa-check" aria-hidden="true"></i> */}
                //     </span>
                // </div>
            )
        case 4:
            return (
                <span className="badge badge-default rounded-sm pt-2 pb-2 pl-3 pr-3">DISBURSED</span>

                // <div className="dash-widget-info text-righ">
                //     <span className="widget-title1 bg-primary">DISBURSED <i className="fa fa-check" aria-hidden="true"></i></span>
                // </div>
            )
        case 5:
            return (
                <span className="badge badge-warning rounded-sm pt-2 pb-2 pl-3 pr-3">CONFIRMED</span>

                // <div className="dash-widget-info text-righ">
                //     <span className="widget-title1 bg-warning">CONFIRMED <i className="fa fa-check" aria-hidden="true"></i></span>
                // </div>
            )
        case 6:
            return (
                <span className="badge badge-danger rounded-sm pt-2 pb-2 pl-3 pr-3">CANCELLED</span>

                // <div className="dash-widget-info text-righ">
                //     <span className="widget-title1 bg-danger">CANCELLED <i className="fa fa-check" aria-hidden="true"></i></span>
                // </div>
            )
        case 10:
            return (
                // <span className="">
                //     <span className="text-white bg-warning p-2">INACTIVE
                //     </span>
                // </span>
                <span className="badge badge-warning rounded-sm pt-2 pb-2 pl-3 pr-3">INACTIVE</span>

            )
        case 11:
            return (
                <span className="badge badge-success rounded-sm pt-2 pb-2 pl-3 pr-3">ACTIVE</span>
            )
        case 20:
            return (<span className="badge badge-default rounded-pill pt-2 pb-2 pl-3 pr-3">NOT APROVED</span>)
        case 21:
            return (<span className="badge badge-success rounded-pill pt-2 pb-2 pl-3 pr-3">APROVED</span>)
        default:
            return (
                <span></span>
                // console.log('error')
            )
    }
}

export const StatusColorFormatter = (status) => {
    // console.log(props)
    switch (status) {
        case 0: return ('dark')
        case 1: return ('secondary')
        case 2: return ('success')
        case 3: return ('danger')
        case 4: return ('primary')
        case 5: return ('warning')
        case 6: return ('danger')
        case 10: return ('warning')
        case 11: return ('success')
    }
}
/**statuses
    * 0 pending
    * 1 OnHold
    * 2 Approved
    * 3 Rejected
    * 4 Disbursed
    * 5 Confirmed
    * 6 Cancelled
 */