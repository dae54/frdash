import React from 'react'

export default function EditBudget() {
    return (
        <React.Fragment>
            <div className="modal fade" id="editBudgetModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable modal-md" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalScrollableTitle">Edit budget</h5>
                            {/* <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button> */}
                        </div>
                        <div className="modal-body"></div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
