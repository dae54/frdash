import React from 'react'

export default function BudgetItemAmount(props) {
    const { name, code, amount = '', checked } = props.budgetItem

    return (
        <React.Fragment>
            <div className="form-group row">
                <label className="col-lg-3 col-form-label">{name}</label>
                <label className="col-lg-3 col-form-label">{code}</label>
                <div className="col-md-5">
                    <input type="number" placeholder="Amount" value={amount} className="form-control" onChange={e => props.onSetItemAmount(e.target.value)} required disabled={!checked} />
                </div>
                <div className="col-md-1">
                    <input type="checkbox" placeholder="Last name" checked={checked} id={code} onChange={() => props.toggleCheckbox(code)}/>
                </div>
            </div>
        </React.Fragment>
    )
}
