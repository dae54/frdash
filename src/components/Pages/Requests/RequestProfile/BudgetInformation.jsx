import React, { useEffect, useState } from 'react'
import axios from 'axios'
import URL from '../../../../URL'
import StatusFormatter from '../../../Gadgets/StatusFormatter'

export default function BudgetInformation(props) {
    const [budgetItemInfo, setBudgetItemInfo] = useState({})
    // const [budgetInfo, setBudgetInfo] = useState({})
    const request = props.request
    const disburseAlert = props.disburseAlert

    async function fetchBudgetItemInfo() {
        await axios.get(`${URL}/budgetItems/info/${props.budgetItem._id}`, {
            params: { budgetId: props.budgetId._id }
        }).then(response => {
            console.log(response.data.data)
            setBudgetItemInfo(response.data.data);
            // setBudgetInfo(response.data.budget);
        }).catch(error => {
            console.log('error')
            console.log(error)
        })
    }
    /**
     * @param a
     * the amount Requested
     * @param b
     * the amount Available
     * @returns the ratio of requested amount to amount available
     */
    function suggestDisburse(a, b) {
        return Math.round(a / b)
    }

    props.setDisburseAlert(suggestDisburse(props.request.amount, budgetItemInfo.availableBudgetItemBalance))

    useEffect(() => {
        fetchBudgetItemInfo();
    }, [])

    return (
        <React.Fragment>
            <div className="card">
                <div className="card-header pb-2">
                    <h4 className='text-dark'>Budget Information</h4>
                </div>
                <div className="card-body pt-0">
                    <p className="text-monospace mb-1">From&nbsp;
                        <span className="text-info text-uppercas h5">
                            ${request.budgetId.name}
                        </span>
                    </p>
                    <table class="table table-borderless text-muted border-0">
                        <tbody>
                            <tr>
                                <td>Item Requested</td>
                                <td className='float-right'>{request.budgetItemId.name}</td>
                            </tr>
                            <tr>
                                <td>Amount Available</td>
                                <td className='float-right'>
                                    {budgetItemInfo.availableBudgetItemBalance ? budgetItemInfo.availableBudgetItemBalance.toLocaleString() : ''}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Amount Aproved <br />
                                    <small className='text-dark'>Amount waiting to be disbursed</small>
                                </td>
                                <td className='float-right'>
                                    {budgetItemInfo.amountAproved ? budgetItemInfo.amountAproved.toLocaleString() : ''}
                                </td>
                            </tr>
                            <tr className='shadow-sm'>
                                <td>
                                    New Amount Available<br />
                                    <small className='text-dark'>amount available - amount aproved</small>
                                </td>
                                <td className='border-to float-right'>
                                    {(budgetItemInfo.availableBudgetItemBalance - budgetItemInfo.amountAproved).toLocaleString()}
                                </td>
                            </tr>
                            <tr>
                                <td>Amount Requested</td>
                                <td className='float-right'>{request.amount.toLocaleString()}</td>
                            </tr>
                            <tr className='shadow-sm'>
                                <td>
                                    Amount remaining if Disbursing All<br />
                                    <small className='text-dark'>New Amount Available - Amount Requested</small>
                                </td>
                                <td className='border-to float-right'>
                                    {(budgetItemInfo.availableBudgetItemBalance - (budgetItemInfo.amountAproved + request.amount)).toLocaleString()}
                                </td>
                            </tr>
                            <tr className='shadow-sm'>
                                <td>
                                    Amount remaining Excluding Aproved Amounts<br />
                                    <small className='text-dark'>Amount Available - Amount Requested</small>
                                </td>
                                <td className='border-to float-right'>
                                    {(budgetItemInfo.availableBudgetItemBalance - request.amount).toLocaleString()}
                                </td>
                            </tr>
                            <hr />

                            <tr>
                                {/* <td>Remarks</td> */}
                                <td className='float-righ'>
                                    {disburseAlert > 1 &&
                                        <span className="bg-danger p-2 text-white">CAN'T BE DISBURSED</span>
                                    }
                                    {disburseAlert > 0.8 && disburseAlert <= 1 &&
                                        <span className="bg-warning p-2 text-white">NOT SAFE TO DISBURSE</span>
                                    }
                                    {disburseAlert < 0.8 &&
                                        <span className="btn btn-success pl-4 pr-4" style={{ cursor: 'auto' }}>SAFE TO DISBURSE</span>
                                    }
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            {/* <div className="">
                <div className="card">
                    <div className="card-header text-uppercase pb-0">Budget Information</div>
                    <div className="card-body pb-0">
                        <table className="table table-borderless border-0 mt-n2">
                            <tbody >
                                <tr>
                                    <td>BUDGET NAME</td>
                                    <td>{budgetInfo.name}</td>
                                </tr>
                                <tr>
                                    <td>BUDGET ISSUED DATE</td>
                                    <td>{budgetInfo.startDate}</td>
                                </tr>
                                <tr>
                                    <td>BUDGET STATUS</td>
                                    <td>
                                        {budgetInfo.status == 0 &&
                                            <StatusFormatter status={10} />
                                        }
                                        {budgetInfo.status == 1 &&
                                            <StatusFormatter status={11} />
                                        }
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="">
                <div className="card">
                    <div className="card-header pb-0">
                        <div className="row justify-content-between">
                            <span className='pl-3'>BUDGET ITEM INFORMATIONS</span>
                            {suggestDisburse(props.requestedAmount, budgetItemInfo.availableBudgetItemBalance) >= 1 &&
                                <span className='mr-3 btn btn-danger btn-sm'>DONT DISBURSE</span>
                            }
                            {suggestDisburse(props.requestedAmount, budgetItemInfo.availableBudgetItemBalance) < 1 && 
                                <>
                                    {suggestDisburse(props.requestedAmount, budgetItemInfo.availableBudgetItemBalance) < 0.8 ?
                                        <span className='mr-3 btn btn-info btn-sm'>SAFE TO DISBURSE</span>
                                        :
                                        <span className='mr-3 btn btn-warning btn-sm'>NOT SAFE TO DISBURSE</span>
                                    }
                                </>
                            }
                        </div>

                    </div>
                    <div className="card-body pb-0">
                        <table className="table table-borderles border-0 mt-n2">
                            <thead>
                                <td>NAME</td>
                                <td>AMOUNT APROVED</td>
                                <td>AMOUNT DISBURSED</td>
                                <td>AMOUNT AVAILABLE NOW</td>
                            </thead>
                            <tbody >
                                <tr>
                                    <td>{props.budgetItem.name}</td>
                                    <td>{budgetItemInfo.amountAproved}</td>
                                    <td>{budgetItemInfo.amountDisbursed}</td>
                                    <td>{budgetItemInfo.availableBudgetItemBalance}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div> */}
        </React.Fragment>
    )
}
