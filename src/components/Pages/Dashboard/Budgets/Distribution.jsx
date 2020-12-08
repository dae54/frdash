import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Chart from 'react-apexcharts'

import StatusRadial from './StatusRadial'
import { Link } from 'react-router-dom'

export default function Distribution() {
    const [budgets, setBudgets] = useState({ loading: true, data: [] })
    const [budgetOnFocus, setBudgetOnFocus] = useState({ value: '', id: '' })
    const [budgetItems, setBudgetItems] = useState([])

    async function fetchBudgetItems() {
        /** 
         * select budgetItems in a selected budget. 
         * The budgetItem should contain @param amount and @param name
         * 
         * fetch budget item distr,select amount, name, code 
         * */
        // console.log(budgetOnFocus)
        await axios.get(`budgets/`, {
            params: {
                select: ['budgetItems'],
                value: budgetOnFocus.id,
                identifier: '_id',
            }
        }).then(response => {
            // console.log(response.data.data[0])
            setBudgetItems(response.data.data[0].budgetItems)
            // setBudgetOnFocus({ value: response.data.data[0].name, id: response.data.data[0]._id })

        }).catch(error => {
            console.log(error.response)
        })
    }

    async function fetchBudget() {
        await axios.get('budgets/', {
            params: {
                select: ['name'],
            }
        }).then(response => {
            // console.log(response.data.data)
            setBudgets({ loading: false, data: response.data.data })
            //set the first value of budget as budget on focus
            setBudgetOnFocus({ value: response.data.data[0].name, id: response.data.data[0]._id })

        }).catch(error => {
            setBudgets({ loading: false, data: [] })
            console.log(error.response)
        })
    }

    function handleBudgetChange(e) {
        setBudgetOnFocus({ value: e.target.innerText, id: e.target.id })
    }

    useEffect(() => {
        /**
         * THIS CALLS @function fetchBudgetItems() WHENEVER @param budgetOnFocus CHANGES. 
         * IMPORTANT: DONT CALL  @function fetchBudgetItems() ON FIRST CALL (The initial call ON RENDER),
         * IE BEFORE @param budgetOnFocus IS INITIALIZED.
         */
        budgetOnFocus.id &&
            fetchBudgetItems()
    }, [budgetOnFocus])

    useEffect(() => {
        fetchBudget()
    }, [])

    var series = [];
    var labels = [];

    if (budgetItems.length) {
        budgetItems.forEach(item => {
            series.push(item.amount)
            labels.push(item.budgetItemId.name)
        })
    }

    const options = {
        labels: labels,
        chart: {
            type: 'donut',
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '70%',
                    labels: {
                        show: true,
                    }
                },
            },
        }
    }

    return (
        <React.Fragment>
            <div className="card-box border-left border-success shadow">

                <span className='d-inline-block pl-3'>
                    <h3 className="card-title text-muted">Budget Distribution</h3>
                </span>
                {budgets.loading ?
                    <p>
                        <div className="spinner-border spinner-border-sm" role="status">
                            <span className="sr-only">Loading...</span>
                        </div> &nbsp; Contacting server. Please wait
                    </p>
                    :
                    <>
                        {budgets.data.length !== 0 &&
                            <span className="d-inline-block float-right">
                                <div className="btn-group float-right">
                                    <button className="btn btn-white shadow-sm rounded-lg pb-0 pt-0 btn-sm dropdown-toggle text-muted" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {budgetOnFocus.value} &nbsp;&nbsp;
                                    </button>
                                    <div className="dropdown-menu" style={{ maxHeight: '30vh', overflowY: 'auto' }}>
                                        {budgets.data.map(item =>
                                            <span className="dropdown-item pt-0 pb-1"
                                                key={item._id}
                                                style={{ cursor: 'pointer' }}
                                                id={item._id}
                                                onClick={handleBudgetChange}>
                                                {item.name}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </span>
                        }
                        <div className="row">
                            {budgets.data.length === 0 ?
                                <h5 className="card-title text-default pl-3">
                                    No budgets created. <Link to={'/budgets/create'}>Create New budget</Link>
                                </h5>
                                :
                                <>
                                    <div className="col-12 col-md-7 d-xl-non">
                                        <Chart options={options} series={series} type="donut" height={280} />
                                    </div>
                                    <div className="col-12 col-md-5 d-xl-non  ">
                                        {budgetItems && budgetOnFocus.id &&
                                            <StatusRadial budgetItems={budgetItems} budgetOnFocus={budgetOnFocus} />
                                        }
                                    </div>
                                </>
                            }
                        </div>
                        {budgets.data.length !== 0 &&
                            <div className="card-footer bg-transparent text-center">
                                <Link to={'#'}>See More</Link>
                            </div>
                        }
                    </>
                }
            </div>
        </React.Fragment>

        //         {/* {isLoading &&
        //                 <div className=" text-center">
        //                     <div className="spinner-grow" role="status">
        //                         <span className="sr-only">Loading...</span>
        //                     </div>
        //                 </div>
        //             } */}
        //         {/* {props.items.length ? */}
        //         {/* //     :
        //         //     <div>No items allocated to budget</div>
        //         // } */}
        //     </div>
        // </React.Fragment >
    )
}
