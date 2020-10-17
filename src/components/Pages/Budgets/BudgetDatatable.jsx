import React from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import StatusFormatter from '../../Gadgets/StatusFormatter';
import { useHistory } from 'react-router-dom'

export default function BudgetDataTable(props) {
    const hist = useHistory();
    var options = {
        onRowClick: function (row) {
            hist.push('/budget/profile', row)
        }
    }
    return (
        <React.Fragment>
                    <div className="card-box">
                        <div className="card-block">
                            <BootstrapTable trStyle={{ cursor: 'pointer' }} data={props.budgets} options={options} dataField='requests' exportCSV pagination hover version='4' search>
                                {/* <TableHeaderColumn thStyle={{ cursor: 'auto' }} isKey dataField='_id' dataFormat={indexNum}>S/N #</TableHeaderColumn> */}
                                <TableHeaderColumn dataField='name' hover={() => console.log('object')} isKey dataSort={true}>Name</TableHeaderColumn>
                                <TableHeaderColumn thStyle={{ cursor: 'auto' }} dataField='amount' dataFormat={(cell, row) => budgetItemSum(row)}>Total Amount</TableHeaderColumn>
                                <TableHeaderColumn thStyle={{ cursor: 'auto' }} dataField='status' dataFormat={cell => <StatusFormatter status={cell + 10} />} filterFormatted>status</TableHeaderColumn>
                            </BootstrapTable>
                        </div>
                    </div>
        </React.Fragment>
    )
    // function indexNum(cell, row, enumObj, index) {
    //     return (<div>{index + 1}</div>)
    // }
    function budgetItemSum(row) {
        var sum=0;
        row.budgetItems.forEach(item=>{
            sum = item.amount + sum
        })
        return sum;
    }
}
