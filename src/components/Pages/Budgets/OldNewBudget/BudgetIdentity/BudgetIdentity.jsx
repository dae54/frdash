import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { BudgetContext } from '../../newBudget/NewBudgetContext'
import moment from 'moment'
/**date picker material */
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
// import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

import Switch from '@material-ui/core/Switch';

import URL from '../../../../../URL'

export default function BudgetIdentity(props) {
    const { state, dispatch } = React.useContext(BudgetContext)
    const [duration, setDuration] = useState(7)
    const [errorMessage, setErrorMessage] = useState('')

    // console.log(state)
    let setBudgetName = budgetName => dispatch({ type: 'budgetName', payload: budgetName })
    let setBudgetDescription = description => dispatch({ type: 'budgetDescription', payload: description })
    let setActivateBudgetInstantly = activateBudget => dispatch({ type: 'activateBudget', payload: activateBudget })
    let setStartDate = startDate => dispatch({ type: 'startDate', payload: startDate })
    let setEndDate = endDate => dispatch({ type: 'endDate', payload: endDate })
    let setBudgetId = budgetId => dispatch({ type: 'budgetId', payload: budgetId })

    function handleSubmit(e) {
        e.preventDefault()
        console.log(state)
        const name = state.budgetName
        const description = state.description
        const startDate = state.startDate
        const endDate = state.endDate
        axios.post(`${URL}/budgets/create`, {
            name, description, startDate, endDate
        }).then((response) => {
            console.log(response)
            // if (response.data.data === 0) {
            if (response.data.data) {
                const budgetId = response.data.data._id
                //update value of context with budgetInfo
                setBudgetId(budgetId)
                // sessionStorage.setItem('budget',JSON.stringify(Budget))

                // change to next tab
                props.setBIFilled(true);
            } else {
                console.log(response)
            }
        }).catch(error => {

            // toast.error(error.response.data.userMessage)
            console.log(error.response)
        })
    }
    
    useEffect(() => {
        console.log('error ', errorMessage ? true : false)
    }, [errorMessage])

    function handleInstantBudgetActivation() {
        setErrorMessage('')
        if (state.activateBudget) {
            setStartDate(new Date().toLocaleDateString())
            return setActivateBudgetInstantly(false)
        }
        axios.get(`${URL}/budgets/checkActive`, {

        }).then((response) => {
            if (response.data.data === 0) {
                //update value of context with budgetInfo
                // Budget.setActivateBudget(!Budget.activateBudget)
                // Budget.setStartDate(new Date().toLocaleDateString())
                setActivateBudgetInstantly(true)
                // change to next tab
                // props.setTab2(true)
            } else {
                // console.log(response)
                setErrorMessage(response.data.message)

                // toast.info(response.data.message)
                setActivateBudgetInstantly(false)
            }
        }).catch((error) => {
            // toast.error(error.response.data.userMessage)
            console.log(error.response)
        })

    }
    useEffect(() => {
        var newDate = moment(state.startDate).add(duration, 'days').calendar()
        // console.log(newDate)
        // console.log(durationError)
        if (duration >= 7) {
            // setDurationError(false)
            setEndDate(newDate)
        } else {
            // setDurationError(true)
        }
        // console.log('object')
    }, [duration])

    useEffect(() => {
        var newDuration = moment(state.endDate).diff(moment(state.startDate), 'days');
        setDuration(newDuration)
    }, [state.endDate])

    return (
        <React.Fragment>
            <div className="col-6">
                <form onSubmit={handleSubmit}>
                    {errorMessage &&
                        <div className="alert alert-warning alert-dismissible fade show" role="alert">
                            <strong>Error!</strong> {errorMessage} <a href="#" className="alert-link"></a>.
                        </div>
                    }


                    <div className="card-box shadow-sm">
                        <div className="row">
                            <div className="col-md-12 col-12 col-lg-12">
                                <h4 className="card-title">Budget Identity</h4>
                                <div className="form-group row">
                                    <label className="col-lg-3 col-form-label">Name:</label>
                                    <div className="col-lg-9">
                                        <input type="text" value={state.budgetName} placeholder="Budget Name" className="form-control" onChange={e => { setBudgetName(e.target.value) }} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-3 col-form-label">Description:</label>
                                    <div className="col-lg-9">
                                        <textarea value={state.budgetDescription} placeholder="Budget Description" className="form-control" onChange={e => { setBudgetDescription(e.target.value) }} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-3 col-form-label">Activate Budget Instantly:</label>
                                    <div className="col-lg-2">
                                        <Switch
                                            checked={state.activateBudget}
                                            onChange={handleInstantBudgetActivation}
                                        />
                                    </div>
                                    {!state.activateBudget &&
                                        <div className="col-5 card ml-3">
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <KeyboardDatePicker
                                                    disableToolbar
                                                    // variant="inline"
                                                    variant="inline"
                                                    format="MM/dd/yyyy"
                                                    margin="normal"
                                                    id="date-picker-inline"
                                                    label="Select Date to Activate Budget"
                                                    value={state.startDate}
                                                    onChange={(e) => setStartDate(e.toLocaleDateString())}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}
                                                />
                                            </MuiPickersUtilsProvider>
                                        </div>
                                    }
                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-3 col-form-label">Budget Duration In Days:</label>
                                    <div className="col-lg-2">
                                        <input type="number" value={duration} className="form-control" onChange={e => setDuration(e.target.value)} min={7} />
                                        {duration < 7 &&
                                            <small className='text-danger'>Only 7 and above</small>
                                        }
                                    </div>
                                    <div className="col-5 card ml-3">
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                                disableToolbar
                                                // variant="inline"
                                                variant="inline"
                                                format="MM/dd/yyyy"
                                                margin="normal"
                                                color='secondary'
                                                id="date-picker-inline"
                                                label="Select Budgets End Date"
                                                value={state.endDate}
                                                onChange={(e) => setEndDate(e.toLocaleDateString())}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <button type='submit' className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </form>
            </div>

        </React.Fragment>
    )
}
