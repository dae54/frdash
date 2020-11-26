import React, { useState, useEffect } from 'react'
import BudgetIdentity from './BudgetIdentity'
import { Link } from 'react-router-dom'
// import BudgetIdentity from './BudgetIdentity/BudgetIdentity'
// import BudgetDetails from './BudgetDetails/BudgetDetails'
import { BudgetContextProvider } from './NewBudgetContext'
import Preview from './Preview'
import BudgetItems from './BudgetItems/BudgetItems'
import { AppContext } from '../../../services/AppContext'


export default function Index() {
    const { dispatch } = React.useContext(AppContext)
    let setBreadcrumbPath = path => dispatch({ type: 'breadcrumbPath', payload: path })

    useEffect(() => {
        setBreadcrumbPath([
            { name: 'Budgets', url: '/budgets' },
            { name: 'Create New' },
        ])
    }, [])

    const [feedback, setFeedback] = useState({ category: '', message: '' })

    return (
        <React.Fragment>
            <BudgetContextProvider>
                {/* <div className="row">
                    <BudgetIdentity setBIFilled={setBIFilled} />
                    {BIFilled &&
                        <BudgetDetails />
                    }
                </div> */}
                {feedback.category &&
                    <Feedback feedback={feedback} />
                }
                <div className="">
                    <div className="row">
                        <div className="col-12 col-sm-9  col-md-6 col-lg-6 col-xl-4">
                            <BudgetIdentity setFeedback={setFeedback} />
                        </div>
                        <div className="col-12 col-sm-9  col-md-6 col-lg-6 col-xl-4">
                            <BudgetItems />
                        </div>
                        <div className="col-12 col-sm-9  col-md-6 col-lg-6 col-xl-4">
                            <Preview setFeedback={setFeedback} />
                        </div>
                    </div>
                </div>
            </BudgetContextProvider>
        </React.Fragment>
    )
}

const Feedback = (props) => {
    console.log(props)
    const { category, message } = props.feedback
    return (
        <div className={`alert alert-${category} alert-dismissible fade show`} role="alert">
            {message}.
            {category === 'success' && <>Click <Link to='#'>here</Link> to view it</>}
        </div>
    )
}