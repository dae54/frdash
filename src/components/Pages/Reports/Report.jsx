import React from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import IPFLOGO from '../../Assets/images/ipflogo.png'

export default function Report() {

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
            <div className="content">
                <div className="row">
                    <div className="col-sm-5 col-4"></div>
                    <div className="col-sm-7 col-8 text-right m-b-30">
                        <div className="btn-group btn-group-sm">
                            <button className="btn btn-primary-three">PDF</button>
                            <button className="btn btn-white"><i className="fa fa-print fa-lg"></i> Print</button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card-box">
                            <h4 className="payslip-title">Report for the budget of month July 2020</h4>
                            <div className="row">
                                <div className="col-sm-6 m-b-20">
                                    <img src={IPFLOGO} className="inv-logo shadow-sm rounded-circle" alt="" />
                                    <ul className="list-unstyled mb-0">
                                        <li>IPF SOFTWARES</li>
                                        <li>1229 Mbezi Temboni,</li>
                                        <li>Dar Es Salaam Tanzania</li>
                                    </ul>
                                </div>
                                <div className="col-sm-6 m-b-20">
                                    <div className="invoice-details">
                                        <h3 className="text-uppercase">REPORT #49029</h3>
                                        <ul className="list-unstyled">
                                            <li>Generated Month: <span>July, 2020</span></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12 m-b-20">
                                    <ul className="list-unstyled">
                                        <li>
                                            <h5 className="mb-0"><strong>ERNEST DANIEL AMANI</strong></h5>
                                        </li>
                                        <li><span>Accountant</span></li>
                                        <li>Employee ID: NS-0001</li>
                                        <li>Joining Date: 7 May 2015</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <BootstrapTable data={history} dataField='requests' hover version='4'>
                                        <TableHeaderColumn isKey dataField='_id' hidden></TableHeaderColumn>
                                        <TableHeaderColumn dataField='budgetItem' filterFormatted dataSort={true}>Budget Item</TableHeaderColumn>
                                        <TableHeaderColumn dataField='initialAmount' filterFormatted dataSort={true} >Initial Amount</TableHeaderColumn>
                                        <TableHeaderColumn dataField='amountDisbursed' filterFormatted dataSort={true} >Amount Disbursed</TableHeaderColumn>
                                        <TableHeaderColumn dataField='amountExtended' dataFormat={(cell, row) => formatExtendetAmount(cell, row)} filterFormatted dataSort={true} >Amount Realocated</TableHeaderColumn>
                                        <TableHeaderColumn dataFormat={(cell, row) => getRemainingAmount(cell, row)}>Net Amount Remaining</TableHeaderColumn>
                                    </BootstrapTable>
                                </div>
                                <div className="col-sm-12 mt-3">
                                    <p><strong>Net Amount Remaining: $59698</strong> (Fifty nine thousand six hundred and ninety eight only.)</p>
                                </div>
                                Fund Request Autogenerated Report
                            </div>
                        </div>
                    </div>
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

// {/* <div className="card">
//                                 <div className="card-header">
//                                     <h4>First Quoter Report</h4>
//                                 </div>
//                                 <div className="card-body">
//                                     Budget Details
//                                     <h5>start date: 12/10/2020</h5>
//                                     <h5>end date: 12/01/2021</h5>
//                                     <h5>Total request count: 100</h5>
//                                     <h5>Most requested item: food</h5>
//                                     <h5>food worth:280000</h5>
//                                 </div>
//                             </div> */}