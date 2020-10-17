import React from 'react'
import moment from 'moment'
export default function TimeLine(props) {
    const { amount, description, budgetItem, createdAt, color } = props.hist
    return (
        <React.Fragment>
            <li>
                <div className="experience-user">
                    <div className={`before-circle bg-${color}`}></div>
                </div>
                <div className="experience-content">
                    <div className="text-monospace">
                        <span className='text-primary'>{amount}</span>
                        <span className='float-right'>{moment(createdAt).fromNow()}</span>
                    </div>
                    <div className='text-uppercase font-weight-bold'>{budgetItem.name + ' ' + budgetItem.code}</div>
                    <div className='text-muted text-truncate'>{description}</div>
                </div>
            </li>
        </React.Fragment>
    )
}
