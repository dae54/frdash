import React from 'react'

export default function ModuleAccess() {
    return (
        <React.Fragment>
            <h6 className="card-title m-b-20">Module Access</h6>
            <div className="m-b-30">
                <ul className="list-group">
                    <li className="list-group-item">
                        Employee
                                <div className="material-switch float-right">
                            <input id="staff_module" type="checkbox" />
                            <label for="staff_module" className="badge-success"></label>
                        </div>
                    </li>
                    <li className="list-group-item">
                        Holidays
                                <div className="material-switch float-right">
                            <input id="holidays_module" type="checkbox" />
                            <label for="holidays_module" className="badge-success"></label>
                        </div>
                    </li>
                    <li className="list-group-item">
                        Leave Request
                                <div className="material-switch float-right">
                            <input id="leave_module" type="checkbox" />
                            <label for="leave_module" className="badge-success"></label>
                        </div>
                    </li>
                    <li className="list-group-item">
                        Events
                                <div className="material-switch float-right">
                            <input id="events_module" type="checkbox" />
                            <label for="events_module" className="badge-success"></label>
                        </div>
                    </li>
                    <li className="list-group-item">
                        Chat
                                <div className="material-switch float-right">
                            <input id="chat_module" type="checkbox" />
                            <label for="chat_module" className="badge-success"></label>
                        </div>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    )
}
