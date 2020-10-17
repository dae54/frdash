import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Reports from '../Dashboard/Budgets/Reports';

export default function Report(props) {
    const [budgetId, setBudgetId] = useState('')

    console.log(props)

    async function fetchReport() {
        console.log('fetchReport')
        await axios.get(`/budgets/report/${props.location.state.budgetId.id}`)
            .then(res => {
                console.log(res)
            }).catch(error=>{
                console.log(error)
                alert(error)
            })
    }
    /**
     * from the given budget,
     * *1. get list of all budget items
     * *2. get initial mount of each budget item
     * *3. get the disbursed amout at that time
     * 4. get amount remaining at that time
     * 5. suggest if budget is to be added or not
     */

    useEffect(() => {
        fetchReport()
    }, [])
    const history = [
        { budgetItem: 'food', initialAmount: 1000000, amountDisbursed: 800000, amountExtended: 10000, extCat: '+' },
        { budgetItem: 'shelter', initialAmount: 100000, amountDisbursed: 90000, amountExtended: 10000, extCat: '-' },
        { budgetItem: 'clothes', initialAmount: 10000000, amountDisbursed: 800000, amountExtended: 0, extCat: '+' },
        { budgetItem: 'man power', initialAmount: 10000000, amountDisbursed: 800000, amountExtended: 10000, extCat: '-' },
        { budgetItem: 'extra', initialAmount: 10000000, amountDisbursed: 800000, amountExtended: 0, extCat: '+' },
        { budgetItem: 'follicles', initialAmount: 10000000, amountDisbursed: 800000, amountExtended: 50000, extCat: '+' },
        { budgetItem: 'information gathering', initialAmount: 10000000, amountDisbursed: 800000, amountExtended: 0, extCat: '+' },
        { budgetItem: 'lessenrs', initialAmount: 10000000, amountDisbursed: 800000, amountExtended: 0, extCat: '+' },
        { budgetItem: 'doubts', initialAmount: 10000000, amountDisbursed: 800000, amountExtended: 10000, extCat: '+' },
        { budgetItem: 'asdf', initialAmount: 10000000, amountDisbursed: 800000, amountExtended: 0, extCat: '+' },
    ]
    return (
        <React.Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 col-xl-8">
                        <div className="title d-flex justify-content-between">
                            <div className="company-details">
                                <h3 className='text-default mb-3'>IPF SOFTWARES</h3>
                                <span>Mbezi, Temboni Tanzania</span> <br />
                                <span>P: (123) 456-7890</span>
                            </div>
                            <div>
                                <h3 className='text-default'>TEST BUDGET REPORT</h3>
                                <div className="btn btn-default btn-sm pl-5 pr-5 float-right" onClick={fetchReport}>PRINT</div>
                            </div>

                        </div>
                        <div className="report-information d-flex justify-content-between mt-5">
                            <div className="accountant-details">
                                <span className='text-default h5 mb-3 font-weight-bold'>Report From</span> <br />
                                <p className='mb-1'>Sakina Dynamics</p>
                                <p className='mb-1'>Mbezi, Temboni Tanzania</p>
                                <p className='mb-1'>P: (123) 456-7890</p>
                            </div>
                            <div className="report-info">
                                <span className='text-default h5 mb-3 font-weight-bold'>Created Date: </span>March 15, 2020 <br />
                                <span className='text-default h5 mb-3 font-weight-bold'>Budget ID: </span> #1f332234499837890 <br />
                                <span className='text-default h5 mb-3 font-weight-bold'>Current Status: </span>Pending <br />
                            </div>
                        </div>
                        <div className="report-body mt-3">
                            <BootstrapTable data={history} dataField='requests' hover version='4'>
                                <TableHeaderColumn isKey dataField='_id' hidden></TableHeaderColumn>
                                <TableHeaderColumn dataField='budgetItem' filterFormatted dataSort={true}>Budget Item</TableHeaderColumn>
                                <TableHeaderColumn dataField='initialAmount' filterFormatted dataSort={true} >Initial Amount</TableHeaderColumn>
                                <TableHeaderColumn dataField='amountDisbursed' filterFormatted dataSort={true} >Amount Disbursed</TableHeaderColumn>
                                <TableHeaderColumn dataField='amountExtended' dataFormat={(cell, row) => formatExtendetAmount(cell, row)} filterFormatted dataSort={true} >Amount Realocated</TableHeaderColumn>
                                <TableHeaderColumn dataFormat={(cell, row) => getRemainingAmount(cell, row)}>Net Amount Remaining</TableHeaderColumn>
                            </BootstrapTable>
                        </div>
                        <hr />
                    </div>
                    {/* <div className="col-4">
                        <Reports />
                    </div> */}
                </div>
            </div>
        </React.Fragment>
    )
    function getRemainingAmount(cell, row) {
        if (row.extCat.includes('-')) {
            return row.initialAmount - row.amountDisbursed - row.amountExtended
        } else {
            return row.initialAmount - row.amountDisbursed + row.amountExtended
        }
    }
    function formatExtendetAmount(cell, row) {
        if (row.amountExtended) return row.amountExtended + ` (${row.extCat})`
        else return 0
    }
}
