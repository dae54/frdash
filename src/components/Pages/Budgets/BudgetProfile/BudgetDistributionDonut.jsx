import React from 'react'
import Chart from 'react-apexcharts'

export default function BudgetDistribution(props) {
    var series = [];
    var labels = []

    props.items.forEach(item => {
        series.push(item.amount)
        labels.push(item.budgetItemId.name)
    })

    var options = {
        labels,
        plotOptions: {
            pie: {
                donut: {
                    size: '75%'
                },
            }
        }
    }
    // console.log("series ",series2)
    // var series =series2
    return (
        <React.Fragment>
            <div className="card-box shadow-sm mb-4">
                <h4 className="card-title text-uppercase">Budget Distribution</h4>
                {/* {isLoading &&
                        <div className=" text-center">
                            <div className="spinner-grow" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    } */}
                {props.items.length ?
                    <Chart options={options} series={series} type="donut" height={250} />
                    :
                    <div>No items allocated to budget</div>
                }
            </div>
        </React.Fragment>
    )
}
