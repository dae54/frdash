import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import { Link, useHistory } from 'react-router-dom'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';


export default function Reports() {
    const [budgets, setBudgets] = useState({ loading: true, data: [] })
    async function fetchBudgets() {
        await axios.get('budgets', {
            params: {
                select: ['name', 'createdAt'],
            }
        }).then(response => {
            setBudgets({ loading: false, data: response.data.data })
        }).catch(error => {
            setBudgets({ loading: false, data: [] })
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
            <div className="card-box border-left border-secondary shadow">
                <h3 className="card-title text-muted pl-3">Reports</h3>
                {budgets.loading ?
                    <p>
                        <span className="spinner-border spinner-border-sm" role="status">
                            <span className="sr-only">Loading...</span>
                        </span> &nbsp; Contacting server. Please wait
                    </p>
                    :
                    budgets.data.length === 0 ?
                        <h5 className="card-title text-default pl-">
                            No budgets created. <Link to={'/budgets/create'}>Create New budget</Link>
                        </h5>
                        :
                        <div className="mt-n5">
                            <BootstrapTable condensed bordered={false} trStyle={{ cursor: 'pointer' }} data={budgets.data} dataField='requests' hover version='4' search>
                                <TableHeaderColumn dataField='name' dataSort={true}>NAME</TableHeaderColumn>
                                <TableHeaderColumn dataField='createdAt' isKey dataFormat={(cell) => moment(cell).format('MMM DD, YYYY')} filterFormatted>CREATED AT</TableHeaderColumn>
                                <TableHeaderColumn dataField='_id' filterFormatted dataFormat={(cell) => <Report id={cell} />}>REPORT</TableHeaderColumn>
                            </BootstrapTable>
                        </div>

                }
            </div>
        </React.Fragment>
    )
}

const Report = (props) => {
    const hist = useHistory()
    return (
        <span className="badge badge-primary rounded-pill pt-2 pb-2 pl-3 pr-3"
            style={{ cursor: 'pointer' }}
            onClick={() => hist.push('report/', { budgetId: props })}
        >
            <i className="fa fa-eye"></i> VIEW
        </span>
    )
}