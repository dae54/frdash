import React, { useState, useEffect } from 'react'
import Chart from 'react-apexcharts'
// import { Link } from 'react-router-dom'
import axios from 'axios'

export default function StatusRadial({ budgetItems, budgetOnFocus }) {
    const [disbursedAmount, setDisbursedAmount] = useState(0)

    var totalAmount = 0
    budgetItems.map(item => {
        totalAmount += item.amount
    })

    async function fetchDisbursedRequests() {
        /**
         * THIS FUNCTION AIMS AT GETTING THE REQUESTS WITH STATUS OF DISBURSED
         * fetch budget item distr,select amount, name, code
         */
        console.log('called')
        await axios.get(`requests/budget/${budgetOnFocus.id}`, {
            params: {
                select: ['amount'],
                identifier: 'status',
                value: 4
            }
        }).then(response => {
            let totalDisbursed = 0
            response.data.data.forEach(item => {
                totalDisbursed += item.amount
            })
            setDisbursedAmount(totalDisbursed)
        }).catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        fetchDisbursedRequests()
    }, [budgetOnFocus])

    useEffect(() => {
        fetchDisbursedRequests()
    }, [])

    const series = [Math.round((disbursedAmount / totalAmount)*100)||0]
    const options = {
        chart: {
            height: 350,
            type: 'radialBar',
            offsetY: -10
        },
        plotOptions: {
            radialBar: {
                startAngle: -135,
                endAngle: 135,
                dataLabels: {
                    name: {
                        fontSize: '16px',
                        color: undefined,
                        offsetY: 120
                    },
                    value: {
                        offsetY: 46,
                        fontSize: '22px',
                        color: undefined,
                        formatter: function (val) {
                            return val + "%";
                        }
                    }
                }
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                shadeIntensity: 0.15,
                inverseColors: false,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 50, 65, 91]
            },
        },
        stroke: {
            dashArray: 2
        },
        labels: [''],
    }
    return (
        <React.Fragment>
            <div className="text-dark">
                <p className='h3 mb-3'>Initial Amount <span className='text-default'>{totalAmount.toLocaleString()}</span></p>
                <p className='p-0 m-0'>Disbursed: {disbursedAmount.toLocaleString()} </p>
                <p className='p-0 m-0'>Remaining: {(totalAmount - disbursedAmount).toLocaleString()}</p>
            </div>
            <div className="mt-n3x">
                <Chart options={options} series={series} type="radialBar" height={200} />
            </div>

            {/* <div className="row">
                <div className="col-6">
                    <Chart options={options} series={series} type="radialBar" height={200} />
                </div>
                <div className="col-6 text-dark">
                    <p className='h3 mb-3'>Initial Amount <span className='text-default'>300,000</span></p>
                    <p className='p-0 m-0'>Remaining: 20000 67%</p>
                    <p className='p-0 m-0'>Disbursed: 300000 48%</p>
                </div>
            </div> */}
        </React.Fragment >
    )
}
