import React from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import StatusFormatter from '../../Gadgets/StatusFormatter';
// import RequestOverviewModal from './RequestOverviewModal';
import { useHistory } from 'react-router-dom'

export default function RequestDataTable(props) {
    const hist = useHistory();
    // const act = (props) => {
    //     var name, color;
    //     switch (props) {
    //         case '1':
    //             name = 'Pending'
    //             color = 'primary'
    //             break;
    //         case '2':
    //             name = 'active'
    //             color = 'secondary'
    //             break;
    //         default:
    //             break;
    //     }
    //     return (
    //         <button className={`btn btn-${color} btn-sm`} disabled>{name}</button>)
    // }
    // var requests = [{

    // }]
    var options = {
        onRowClick: function (row) {
            // console.log(row)
            // row.userId = row.userId._id     //delete userId object
            hist.push('/request/profile', row)
        }
    }
    return (
        <React.Fragment>
            <div className="row">
                <div className="col-sm-12">
                    <div className="card-box">
                        <div className="card-block">
                            <BootstrapTable trStyle={{ cursor: 'pointer' }} data={props.requests} options={options} dataField='requests' exportCSV pagination hover version='4' search>
                                <TableHeaderColumn thStyle={{ cursor: 'auto' }} isKey dataField='_id' dataFormat={indexNum}>S/N #</TableHeaderColumn>
                                <TableHeaderColumn dataField='userId' dataFormat={cell => cell.firstName + " " + cell.lastName} filterFormatted dataSort={true}>Requested By</TableHeaderColumn>
                                <TableHeaderColumn dataField='budgetItemId' dataFormat={cell => cell.name} filterFormatted dataSort={true} >Budget Item</TableHeaderColumn>
                                <TableHeaderColumn dataField='budgetId' dataFormat={cell => cell.name} filterFormatted dataSort={true} >On Budget</TableHeaderColumn>
                                <TableHeaderColumn thStyle={{ cursor: 'auto' }} dataField='amount'>Amount</TableHeaderColumn>
                                <TableHeaderColumn thStyle={{ cursor: 'auto' }} dataField='status' dataFormat={cell => <StatusFormatter status={cell} />} filterFormatted>status</TableHeaderColumn>
                                {/* <TableHeaderColumn thStyle={{ cursor: 'auto' }} dataField='action' dataFormat={(cell, row) => action(row)} filterFormatted>Action</TableHeaderColumn> */}
                            </BootstrapTable>
                        </div>
                    </div>
                </div>
            </div>
            {/* <RequestOverviewModal /> */}
        </React.Fragment>
    )
    function indexNum(cell, row, enumObj, index) {
        return (<div>{index + 1}</div>)
    }

    // function action(row) {
    //     // console.log(row)
    //     return (
    //         <div className="text-right">
    //             <button onClick={() => alert('helo daniel')} className='btn btn-sm btn-outline-info mr-2' data-toggle="modal" data-target="#staticBackdrop" onClick={() => view(row)}>
    //                 <i className="fa fa-eye" aria-hidden="true"></i>
    //             </button>
    //             <button onClick={() => alert('helo daniel')} className='btn btn-sm btn-outline-warning'>
    //                 <i className="fa fa-trash" aria-hidden="true"></i>
    //             </button>
    //         </div>
    //     )
    //     function view(row) {
    //         console.log(row)
    //     }
    // }
}
