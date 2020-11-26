import React from 'react'

export default function InfoCard(props) {
    const { color, label, icon, amount, count } = props.item
    return (
        <React.Fragment>
            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-3">
                <div className="dash-widget shadow-sm">
                    <span className={`dash-widget-bg1 bg-${color}`}><i className={`fa fa-${icon}`} aria-hidden="true"></i></span>
                    <div className="dash-widget-info text-right">
                        <h3 className=''>
                            <span className='text-sm'>{amount}</span>
                            {count &&
                                <span className='font-weight-lighter'>({count})</span>
                            }
                        </h3>
                        <span className={`widget-title1 bg-${color}`}>{label}
                            {/* <i className="fa fa-check" aria-hidden="true"></i> */}
                        </span>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
