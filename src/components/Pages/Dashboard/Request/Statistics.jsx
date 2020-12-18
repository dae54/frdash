import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts";
import axios from 'axios'

export default function Statistics() {
    const [allRequests, setAllRequests] = useState({ loading: true, data: [] })


    /**
     * status,
     *  disbursed, all
     *  
     */
    async function fetchRequests() {
        await axios.get('requests', {
            params: {
                select: ['amount', 'createdAt'],
            }
        }).then(response => {
            setAllRequests({ loading: false, data: response.data.data })
        }).catch(error => {
            setAllRequests({ loading: false, data: [] })
            console.log(error)
        })
    }

    let x_axis = allRequests.data.map(request => {
        return request.createdAt
    })

    useEffect(() => {
        fetchRequests()
    }, [])

    let series = [{
        name: 'Requests',
        data: allRequests.data.map(request => {
            return request.amount
        })
    }
    ]

    const options = {
        chart: {
            height: 350,
            type: 'area'
        },
        markers: {
            size: 3
        },
        toolbar: {
            show: true
        },
        // title: {
        //     text: 'Statistics',
        //     align: 'left',
        // },
        // subtitle: {
        //     text: 'Price Movements',
        //     align: 'left',
        //     offsetX: 0,
        //     offsetY: 0,
        // },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            type: 'datetime',
            categories: x_axis,
            labels: {
                show: true,
                rotate: -45,
            },
            title: {
                text: 'Time Issued',
                offsetX: 0,
                offsetY: 15,
            }
        },
        yaxis: {
            title: {
                text: 'Price (Tsh)'
            },
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy HH:mm'
            },
        },
        // yaxis: {
        //     opposite: true
        // },
        fill: {
            type: 'gradient',
            gradient: {
                opacityFrom: 0.6,
                opacityTo: 0.8,
            }
        },
    }
    return (
        <React.Fragment>
            <div className="card-box border-left border-default shadow">
                <span className='d-inline-block pl-3'>
                    <h3 className="card-title text-muted">Statistics</h3>
                </span>
                <span className="d-inline-block float-right">
                    <div className="btn-group float-right">
                        <button className="btn btn-white shadow-sm rounded-lg pb-0 pt-0 btn-sm dropdown-toggle text-muted"
                            type="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            style={{ cursor: 'not-allowed' }}>
                            Last 6 Months &nbsp;&nbsp;
                        </button>
                    </div>
                </span>
                {allRequests.loading ?
                    <p>
                        <span className="spinner-border spinner-border-sm" role="status">
                            <span className="sr-only">Loading...</span>
                        </span> &nbsp; Contacting server. Please wait
                    </p>
                    :
                    allRequests.data.length === 0 ?
                        <h5 className="card-title text-mute">No requests to show.</h5>
                        :
                        <Chart options={options} series={series} type="area" width='100%' height='300px' />
                }

            </div>

        </React.Fragment>
    )
}
