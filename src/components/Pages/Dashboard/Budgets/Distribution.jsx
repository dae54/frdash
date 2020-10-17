import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Chart from 'react-apexcharts'

import StatusRadial from './StatusRadial'
import { Link } from 'react-router-dom'

export default function Distribution() {
    const [budgets, setBudgets] = useState([])
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
            setBudgets(response.data.data)

            //set the first value of budget as budget on focus
            setBudgetOnFocus({ value: response.data.data[0].name, id: response.data.data[0]._id })

        }).catch(error => {
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
            <div className="card shadow-sm mb-4">
                <div className="card-header pb-2 pt-3">
                    <span className='d-fle justify-content-between'>
                        <h3 className="card-title text-muted">Budget Distribution</h3>
                        {/* <button className="btn btn-info" onClick={fetchBudget}><i className="fa fa-clock"></i></button> */}
                        {/* <select className='form-control w-25 rounded-sm'>
                            {budgets.map(item => <option value="">{item.name}</option>)}
                        </select> */}
                        <div className="btn-group float-right mt-n4">
                            <button className="btn btn-white shadow-sm rounded-lg pb-0 pt-0 btn-sm dropdown-toggle text-muted" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {budgetOnFocus.value} &nbsp;&nbsp;
                            </button>
                            <div className="dropdown-menu" style={{ maxHeight: '30vh', overflowY: 'auto' }}>
                                {budgets.map(item =>
                                    <span className="dropdown-item pt-0 pb-0"
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
                </div>
                <div className="card-body pb-0 pt-0">
                    <div className="row">
                        <div className="col-7">
                            <Chart options={options} series={series} type="donut" height={280} />
                        </div>
                        <div className="col-5">
                            {budgetItems && budgetOnFocus.id ?
                                <StatusRadial budgetItems={budgetItems} budgetOnFocus={budgetOnFocus} />
                                :
                                <div className="jumbotron">help here</div>
                            }
                        </div>
                    </div>
                </div>
                <div className="card-footer bg-transparent text-center">
                    <Link to={'#'}>See More</Link>
                </div>

                {/* {isLoading &&
                        <div className=" text-center">
                            <div className="spinner-grow" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    } */}
                {/* {props.items.length ? */}
                {/* //     :
                //     <div>No items allocated to budget</div>
                // } */}
            </div>
        </React.Fragment >
    )
}
