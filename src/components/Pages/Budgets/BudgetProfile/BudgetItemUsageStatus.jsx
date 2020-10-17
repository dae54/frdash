import React, { useState, useEffect } from 'react'
import axios from 'axios'
import URL from '../../../../URL'

export default function BudgetItemUsageStatus({ budgetId }) {
    const [data, setData] = useState([]);
    const [budgetName, setBudgetName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    function findPercentage(amount, total) {
        return Math.round((amount / total) * 100)
    }
    useEffect(() => {
        setIsLoading(true)
        axios.get(`${URL}/budgetItems/budgetItemNameAmount/${budgetId}`)
            .then(resp => {
                setData(resp.data.data.data)
                setBudgetName(resp.data.data.budgetName)
                setIsLoading(false)
                // budgetName = 
                // console.log(resp)
            }).catch(err => {
                console.log('err', err)
                setIsLoading(false)
            })
    }, [])
    const BudgetItem = ({ title, value, total }) => {
        const percentage = findPercentage(value, total)
        var color = 'info';
        if (percentage > 75 && percentage < 85) {
            color = 'warning'
        } else if (percentage >= 85) {
            color = 'danger'
        }
        return (
            <>
                <h4 className="small font-weight-bold">{title}
                    <span className="ml-5 text-secondary float-right">
                        <span className={`text-${color}`}>{value}/</span>
                        {total}
                    </span>
                    <span className="float-right">({percentage}%)</span>
                </h4>
                <div className="progress mb-4">
                    <div className={`progress-bar progress-bar-striped bg-${color}`} role="progressbar" style={{ width: `${percentage}%` }} aria-valuenow={value} aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </>
        )
    }
    return (
        <React.Fragment>
            <div className="card shadow-sm mb-4">
                <div className="card-header py-3">
                    <h4 className="card-title text-uppercase">Budget Item Usage</h4>
                </div>
                <div className="card-body" style={{maxHeight:400, overflowX:'hidden', overflowY:'auto'}}>
                    {data ?
                        data.map((item, index) => {
                            return (
                                <BudgetItem key={index} title={item.title} value={item.value} total={item.total} />
                            )
                        })
                        :
                        <div className=" text-center">
                            No Data
                        </div>
                    }
                    {isLoading &&
                        <div className=" text-center">
                            <div className="spinner-grow" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </React.Fragment>
    )
}
