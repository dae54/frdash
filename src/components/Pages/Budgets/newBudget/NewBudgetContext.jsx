import React, { useReducer } from "react";

let initialState = {
    budgetName: '', budgetDescription: '', budgetItems: [], budgetId: '',
    fetchNew: '', activateBudget: false, startDate: new Date().toLocaleDateString(), endDate: ''
}
let reducer = (state, action) => {
    switch (action.type) {
        case 'budgetName':
            return { ...state, budgetName: state.budgetName = action.payload }
        case 'budgetDescription':
            return { ...state, budgetDescription: state.budgetDescription = action.payload }
        case 'budgetItems':
            return { ...state, budgetItems: state.budgetItems = action.payload }
        case 'addBudgetItem':
            return { ...state, budgetItems: state.budgetItems.concat(action.payload) }
        case 'activateBudget':
            return { ...state, activateBudget: state.activateBudget = action.payload }
        case 'startDate':
            return { ...state, startDate: state.startDate = action.payload }
        case 'endDate':
            return { ...state, endDate: state.endDate = action.payload }
        case 'budgetId':
            return { ...state, budgetId: state.budgetId = action.payload }
    }
}

const BudgetContext = React.createContext({});

const BudgetContextProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    let value = { state, dispatch }
    return (
        <BudgetContext.Provider value={value}>{props.children}</BudgetContext.Provider>
    )
}

const BudgetContextConsumer = BudgetContext.Consumer;
export { BudgetContext, BudgetContextConsumer, BudgetContextProvider }