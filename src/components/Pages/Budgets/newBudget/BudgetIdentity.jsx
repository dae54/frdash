import React, { useEffect, useState } from 'react'
import { BudgetContext } from './NewBudgetContext'
import axios from 'axios'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import moment from 'moment'
import Switch from '@material-ui/core/Switch';
import { useAlert } from 'react-alert'

/**date picker material */
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';


export default function BudgetIdentity({ setFeedback }) {
    const { state, dispatch } = React.useContext(BudgetContext)
    const [duration, setDuration] = useState(7)
    // const [errorMessage, setErrorMessage] = useState('')
    // loading indicators
    const [activateNowLoading, setActivateNowLoading] = useState(false)
    const alert = useAlert()

    // console.log(state)
    let setBudgetName = budgetName => dispatch({ type: 'budgetName', payload: budgetName })
    let setBudgetDescription = description => dispatch({ type: 'budgetDescription', payload: description })
    let setActivateBudgetInstantly = activateBudget => dispatch({ type: 'activateBudget', payload: activateBudget })
    let setStartDate = startDate => dispatch({ type: 'startDate', payload: startDate })
    let setEndDate = endDate => dispatch({ type: 'endDate', payload: endDate })
    // let setBudgetId = budgetId => dispatch({ type: 'budgetId', payload: budgetId })


    function handleInstantBudgetActivation() {
        // setErrorMessage('')
        if (state.activateBudget) {
            setStartDate(new Date().toLocaleDateString())
            return setActivateBudgetInstantly(false)
        }
        setActivateNowLoading(true)
        axios.get('/budgets/checkActive').then((response) => {
            setActivateNowLoading(false)
            console.log(response)
            if (response.data.data === 0) {
                setActivateBudgetInstantly(true)
            } else {
                alert.error('Only one active budget is allowed')
                // setErrorMessage(response.data.message)
                // setFeedback({category:'warning',message:response.data.message})
            }
        }).catch((error) => {
            setActivateNowLoading(false)
            // setFeedback({category:'error',message:error.response.data.userMessage})
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
            <div className="card shadow-sm">
                <div className="card-header bg-light pb-1">
                    <span className=''>Basic Details</span>
                    <span className="float-right">
                        Activate Now &nbsp;
                            {activateNowLoading ?
                            <div className="spinner-grow spinner-grow-sm text-danger" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                            :
                            <Switch
                                checked={state.activateBudget}
                                onChange={handleInstantBudgetActivation}
                            />
                        }
                    </span>
                </div>
                <div className="card-body">
                    <div className="form-group row row-cols-1">
                        <div className="col">
                            <input type="text" placeholder="Budget Name" className="form-control" value={state.budgetName} onChange={e => { setBudgetName(e.target.value) }} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col">
                            <textarea type="text" placeholder="Description" className="form-control" rows={5} style={{ resize: 'none' }} value={state.budgetDescription} onChange={e => { setBudgetDescription(e.target.value) }} />
                        </div>
                    </div>
                    {!state.activateBudget &&

                        <div className="form-group row">
                            <div className="col">
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="dd/MM/yyyy"
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
                        </div>
                    }
                    <div className="form-group row">
                        <label className="col-lg-4 col-form-label">Duration (Days):</label>
                        <div className="col-lg-4">
                            <input type="number" value={duration} className="form-control" min={7} onChange={e => setDuration(e.target.value)} />
                        </div>
                        {duration < 7 &&
                            <small className='text-danger'>Only 7 and above</small>
                        }
                    </div>
                    <div className="form-group row">
                        <div className="col">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    // variant="inline"
                                    variant="inline"
                                    format="dd/MM/yyyy"
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
        </React.Fragment>
    )
}
