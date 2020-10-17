import React from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

// import MapBudgetItems from './MapBudgetItems';

export default function BudgetItems(prop) {
    var total = 0;
    const props = prop.budget.location.state;

    console.log(props.budgetItems)
    return (
        <React.Fragment>
            <div className="card-box">
                <div className="col-md-12 col-12 col-lg-12">
                    <h4 className="card-title text-uppercase">Budget details</h4>
                    <BootstrapTable className='mt-n5' data={props.budgetItems} tableStyle={{overflow:'hidden'}} bordered={false} maxHeight='34vh' ignoreSinglePage hover version='4' search>
                        <TableHeaderColumn isKey dataField='_id' hidden>S/N #</TableHeaderColumn>
                        <TableHeaderColumn dataField='budgetItemId' dataFormat={cell => cell.name} filterFormatted>Name</TableHeaderColumn>
                        <TableHeaderColumn dataField='budgetItemId' dataFormat={cell => cell.code} filterFormatted>Code</TableHeaderColumn>
                        <TableHeaderColumn dataField='amount'>Amount</TableHeaderColumn>
                    </BootstrapTable>
                    {/* <FooterData label='helo' /> */}
                    {/* <FooterData></FooterData> */}
                    {/* <div className="form-group row">
                        <table className="table table-borderless border-0">
                            <thead>
                                <tr>
                                    <td>NAME</td>
                                    <td>CODE</td>
                                    <td>AMOUNT</td>
                                </tr>
                            </thead>
                            <tbody>
                                {props.budgetDetails.length !== 0 &&
                                    props.budgetDetails.map((item) => {
                                        return <MapBudgetItems key={item._id} budgetItems={item} />
                                    })
                                }
                            </tbody>
                        </table>
                        {props.budgetDetails.length !== 0 &&
                            props.budgetDetails.forEach((item) => {
                                total = item.amount + total
                            })
                        }
                            Total :{total}
                    </div> */}
                </div>
            </div>
        </React.Fragment>
    )
    // function formatName(cell, row) {
    //     console.log(cell)
    //     return cell.name
    // }
}
