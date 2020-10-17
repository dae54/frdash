import React from 'react'

export default function MapBudgetItems(props) {
    // console.log(props.budgetItems)
    const { name, code } = props.budgetItems.budgetItemId;
    const { amount } = props.budgetItems
    return (
        <React.Fragment>
            <tr>
                <td>{name}</td>
                <td>{code}</td>
                <input type="number" placeholder="Amount" value={amount} className="form-control" required disabled={true} />
            </tr>
        </React.Fragment>
    )
}
