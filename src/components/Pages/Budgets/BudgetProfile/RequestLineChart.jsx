import React from 'react'
import Chart from "react-apexcharts";
import moment from 'moment'

export default function RequestBarChart(props) {
    // const [isLoading, setIsLoading] = useState(false)

    // sort the array by created date descending
    const sorted = props.requests.slice().sort((a, b) => moment(a.createdAt).diff(b.createdAt))
    // prepare array of object with only required data
    let arr = sorted.map((item) => {
        const name = item.budgetItemId.name;
        const amount = item.amount
        return { name, amount }
    })
    // group by name the obtained array above
    const seriesMiddle = arr.reduce((result, currentValue) => {
        (result[currentValue['name']] = result[currentValue["name"]] || []).push(
            currentValue
        )
        return result
    }, {})
    // group by name similar amounts from the object above
    var series = Object.keys(seriesMiddle).map(key => {
        let asdf = seriesMiddle[key].map(item => {
            return item.amount;
        })
        return { name: key, data: asdf }
    })

    var options = {
        chart: {
            id: "basic-bar"
        },
        stroke: {
            curve: 'smooth',
        },
        markers: {
            size: 5,
        },
    }
    return (
        <React.Fragment>
            <div className="card-box">
                <h3 className="card-title text-uppercase">Requests Overview Graph</h3>
                {/* {isLoading &&
                    <div className=" text-center">
                        <div className="spinner-grow" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                } */}
                {props.requests.length ?
                    <Chart options={options} series={series} type="area" width='100%' height='400px' />
                    :
                    <div className=''>Budget's sheet is clean</div>
                }
                {/* {!isLoading &&
                    <Chart options={options} series={series} type="area" width='100%' height='400px' />
                } */}
            </div>
        </React.Fragment>
    )
}
