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
                <div className="badge badge-primary rounded-0 pt-2 pb-2">PENDING</div>
            )
        case 1:
            return (
                <div className="dash-widget-info text-righ">
                    <span className="widget-title1 bg-secondary">ONHOLD
                     {/* <i className="fa fa-check" aria-hidden="true"></i> */}
                    </span>
                </div>
            )
        case 2:
            return (
                <div className="dash-widget-info text-righ">
                    <span className="widget-title1 bg-success">APROVED
                    {/* <i className="fa fa-check" aria-hidden="true"></i> */}
                    </span>
                </div>
            )
        case 3:
            return (
                <div className="dash-widget-info text-righ">
                    <span className="widget-title1 bg-dark">REJECTED
                    {/* <i className="fa fa-check" aria-hidden="true"></i> */}
                    </span>
                </div>
            )
        case 4:
            return (
                <div className="dash-widget-info text-righ">
                    <span className="widget-title1 bg-primary">DISBURSED <i className="fa fa-check" aria-hidden="true"></i></span>
                </div>
            )
        case 5:
            return (
                <div className="dash-widget-info text-righ">
                    <span className="widget-title1 bg-warning">CONFIRMED <i className="fa fa-check" aria-hidden="true"></i></span>
                </div>
            )
        case 6:
            return (
                <div className="dash-widget-info text-righ">
                    <span className="widget-title1 bg-danger">CANCELLED <i className="fa fa-check" aria-hidden="true"></i></span>
                </div>
            )
        case 10:
            return (
                <span className="">
                    <span className="text-white bg-warning p-2">INACTIVE
                    </span>
                </span>
            )
        case 11:
            return (
                <span className="">
                    <span className="text-white bg-success p-2">ACTIVE <i className="fa fa-check" aria-hidden="true"></i></span>
                </span>
            )
        default:
            return (
                console.log('error')
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