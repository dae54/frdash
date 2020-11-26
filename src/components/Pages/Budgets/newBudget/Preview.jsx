import React from 'react'
import { BudgetContext } from './NewBudgetContext'
import axios from 'axios'

export default function Preview({ setFeedback }) {
    var budgetItemAndValue = [];

    // const [total, setTotal] = useState()
    const { state } = React.useContext(BudgetContext)

    // var total = 0;

    // useEffect(() => {
    //     var total = state.budgetItems.map((item) => Number(item.amount))
    //         .reduce((a, b) => {
    //             a = a || 0
    //             b = b || 0
    //             return a + b
    //         }, 0)
    //     setTotal(total)
    //     // console.log(total)
    // }, [state.budgetItems])

    // function calculatePercentage(amount) {
    //     console.log(amount)
    //     // console.log(total)
    //     return amount / total * 100
    // }

    function handleSubmit() {
        state.budgetItems.forEach(item => {
            if (item.amount) {
                budgetItemAndValue.push({ budgetItemId: item.budgetItemId, amount: item.amount })
            }
        })
        const newBudget = {
            budgetItems: budgetItemAndValue,
            name: state.budgetName,
            description: state.budgetDescription,
            startDate: state.startDate,
            endDate: state.endDate,
            status: state.activateBudget ? 1 : 0
        }

        console.log(newBudget)

        axios.post('/budgets/', {
            newBudget
        }).then(response => {
            setFeedback({ category: 'success', message: response.data.message })
            //TODO reset budget context to initial state
            //TODO 
        }).catch(error => {
            setFeedback({ category: 'danger', message: error.response.data.developerMessage })
            console.log(error.response)
        })
    }
    return (
        <React.Fragment>
            <div className="card shadow-sm">
                <div className="card-header bg-light">
                    <span>Preview</span>
                    {/* <button className="btn btn-outline-success float-right" onClick={handleSubmit}>Submit</button> */}
                </div>
                <div className="card-body">
                    {/* Budget Identity */}
                    <span className="text-uppercase h4">{state.budgetName}</span>
                    <p className="text-monospace">{state.budgetDescription ? 'Description: ' + state.budgetDescription : ''}</p>
                    <div className='col m-0 p-0 pt-2'>
                        <span>Start At: {state.startDate}</span>
                        <span className="float-right">End At: {state.endDate}</span>
                    </div>

                    {/* Budget Items */}
                    <div className="row" style={{ maxHeight: '50vh', overflowY: 'auto', overflowX: 'none' }}>
                        {state.budgetItems.length !== 0 &&
                            state.budgetItems.map((item) => {
                                if (item.amount != undefined && item.amount != '') {
                                    // amountArray.push(item.amount)
                                    // let total = amountArray.reduce((a, b) => {
                                    //     return Number(a) + Number(b);
                                    // },0)
                                    // var perc = calculatePercentage(item.amount)

                                    // console.log(amountArray)
                                    return (<BudgetItemAmount key={item.budgetItemId} budgetItem={item} />)
                                }
                            })
                        }
                    </div>
                </div>
                <div className="card-footer">
                    {state.budgetName && state.budgetDescription ?
                        <button className="btn btn-outline-success float-right" onClick={handleSubmit}>Submit</button>
                        :
                        <button className="btn btn-outline-success float-right" disabled>Fill all required Data</button>
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

const BudgetItemAmount = (props) => {
    const { name, amount = '', percent } = props.budgetItem

    return (
        <div className="col-12">
            <div className="form-group row">
                <label className="col-5 col-md-12 col-lg-5 col-form-label">{name}</label>
                <div className="col">
                    <input type="text" value={Number(amount).toLocaleString()} placeholder="Budget Name" className="form-control" disabled />
                </div>
            </div>
        </div>
    )
}