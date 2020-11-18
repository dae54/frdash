import React, { useState } from 'react'
import readXlsxFile from 'read-excel-file'
import axios from 'axios'
import { useAlert } from 'react-alert'

import { BudgetContext } from '../NewBudgetContext'

export default function ExcelImport() {
    const { state, dispatch } = React.useContext(BudgetContext)
    let addBudgetItem = budgetItem => dispatch({ type: 'addBudgetItem', payload: budgetItem })
    let setBudgetItems = budgetItems => dispatch({ type: 'budgetItems', payload: budgetItems })

    const [excelItems, setExcelItems] = useState([])
    const [status, setStatus] = useState({ loading: false, itemsLoaded: false })
    const alert = useAlert()

    function handleExcelChange(e) {
        readXlsxFile(e).then(data => {
            var obj = []
            data.shift()
            data.forEach(excelItem => {
                obj.push({ name: excelItem[0], code: excelItem[1].toUpperCase(), amount: excelItem[2] })
            })
            setExcelItems(obj)
        })
    }

    function uploadBudgetItems() {
        const final = excelItems.filter(item => !state.budgetItems.some(data => item.code === data.code))
        if (final.length === 0) {
            setStatus({ loading: false, itemsLoaded: true })
            return syncBudgetItemAmounts()
        }
        setStatus({ loading: true, itemsLoaded: false })

        axios.post(`${URL}/budgetItems/create`, {
            budgetItems: final
        }).then(response => {
            setStatus({ loading: false, itemsLoaded: true })

            //renaming _id field to budgetItemId
            response.data.data.budgetItemId = response.data.data._id;
            delete response.data.data._id
            addBudgetItem(response.data.data);
            syncBudgetItemAmounts()
        }).catch(error => {
            setStatus({ loading: false, itemsLoaded: false })
            console.log(error.response)
        })

    }


    function syncBudgetItemAmounts() {
        console.log('sync budget item amount')
        excelItems.forEach(item => setBudgetItemAmount(item.code, item.amount))
    }

    function setBudgetItemAmount(code, amount) {
        const updatedBudgetItems = state.budgetItems.map(item => {
            if (item.code === code)
                item.amount = amount;
            return item;
        });
        console.log(updatedBudgetItems)
        setBudgetItems(updatedBudgetItems);
    }

    return (
        <React.Fragment>
            <div className="modal fade" id="excelFileInput" tabindex="-1" aria-labelledby="excelFileInput" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Excel Budget Import
                        </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <input type="file" className="form-control p-1" onChange={(e) => handleExcelChange(e.target.files[0])} required />
                            {excelItems.length > 0 &&
                                <table className="table table-sm">
                                    <thead>
                                        <tr>
                                            {Object.keys(excelItems[0]).map(title => <th key={title}>{title}</th>)}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {excelItems.map(item => {
                                            return (
                                                <tr key={item.code}>
                                                    <td>{item.name}</td>
                                                    <td>{item.code}</td>
                                                    <td>{item.amount}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            }
                        </div>
                        <div className="modal-footer">
                            {status.loading ?
                                <button type="button" className="btn btn-primary">
                                    <div className="spinner-border spinner-border-sm"></div>
                                    &nbsp; Please wait...
                                </button>
                                :
                                status.itemsLoaded ?
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => alert.success('Done syncing budget items')}>Sync & Close</button>
                                    :
                                    <>
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-primary" onClick={uploadBudgetItems}>Upload Items</button>

                                    </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
