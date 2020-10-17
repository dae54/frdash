import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import { Link, useHistory } from 'react-router-dom'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';


export default function Reports() {
    const [budgets, setBudgets] = useState([])
    async function fetchBudgets() {
        await axios.get('budgets', {
            params: {
                select: ['name', 'createdAt'],
            }
        }).then(response => {
            setBudgets(response.data.data)
        }).catch(error => {
            console.log(error.response)
        })
    }

    useEffect(() => {
        fetchBudgets()
        return () => {
            console.log('exiting reports')
        }
    }, [])

    return (
        <React.Fragment>
            <div className="card shadow pb-4" style={{height:'48vh'}}>
                <div className="card-header">
                    <h3 className="card-title text-muted">Reports</h3>
                </div>
                <div className="card-body p-0 mt-n5">
                    <BootstrapTable condensed bordered={false} trStyle={{ cursor: 'pointer' }} data={budgets} dataField='requests' hover version='4' search>
                        <TableHeaderColumn dataField='name' dataSort={true}>NAME</TableHeaderColumn>
                        <TableHeaderColumn dataField='createdAt' isKey dataFormat={(cell) => moment(cell).format('MMM DD, YYYY')} filterFormatted>CREATED AT</TableHeaderColumn>
                        <TableHeaderColumn dataField='_id' filterFormatted dataFormat={(cell) => <Report id={cell} />}>REPORT</TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </div>
        </React.Fragment>
    )
}

const Report = (props) => {
    const hist = useHistory()
    console.log(hist)
    return (
        <span className="badge badge-primary rounded-pill pt-2 pb-2 pl-3 pr-3"
            style={{ cursor: 'pointer' }}
            onClick={() => hist.push('report/', { budgetId: props })}
            >
            <i className="fa fa-eye"></i> VIEW REPORT
        </span>
    )
}