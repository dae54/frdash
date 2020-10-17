import React from 'react'
import NavLink from 'react-router-dom'

export default function RequestOverviewModal(props) {
    return (
        <React.Fragment>
            {/* <!-- Modal --> */}
            <div className="modal fade " id="staticBackdrop" data-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-l " role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title text-monospace" id="staticBackdropLabel">Budget By Daniel Ernest, amount 50000</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body ">
                            <table className="table table-borderless shadow-none">
                                <tbody>
                                    <tr>
                                        <td>ITEM NAME</td>
                                        <td>Food</td>
                                    </tr>
                                    <tr>
                                        <td>CODE</td>
                                        <td>FD100</td>
                                    </tr>
                                    <tr>
                                        <td>AMOUNT</td>
                                        <td>1000000</td>
                                    </tr>
                                    <tr>
                                        <td>DESCRIPTION</td>
                                        <td>Request for attending hackerthon</td>
                                    </tr>
                                    <tr>
                                        <td>DATE</td>
                                        <td>12/10/2019</td>
                                    </tr>
                                    <tr>
                                        <td>STATUS</td>
                                        <td>Pending</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-info">Explore</button>
                            <NavLink className="button btn-info" to={{ pathname: 'user/profile', userId: _id }}>{firstName + ' ' + lastName}</NavLink>

                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
