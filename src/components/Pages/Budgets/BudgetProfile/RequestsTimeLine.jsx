import React, { useState, useEffect } from 'react'
import axios from 'axios'
import URL from '../../../../URL'
import { StatusColorFormatter } from '../../../Gadgets/StatusFormatter'
import TimeLine from '../../../Gadgets/TimeLine'
import './RequestTimeLine.css'

export default function RequestsTimeLine(props) {
    const [reqHist, setReqHist] = useState([])
    async function fetchRequestHist() {
        await axios.get(`${URL}/budgets/hist`, {
            params: {
                budgetId: props.budgetId,
            }
        }).then(response => {
            var data = [];
            props.setRequests(response.data.data)
            response.data.data.forEach(item => {
                let { amount, description, createdAt } = item;
                let budgetItem = item.budgetItemId;
                const color = StatusColorFormatter(item.status)
                const finalData = {
                    amount, description, createdAt, budgetItem, color
                }
                data.push(finalData)
            })
            setReqHist(data)
        }).catch(error => {
            console.log(error)
        })
    }
    useEffect(() => {
        fetchRequestHist()
    }, [])
    return (
        <React.Fragment>
            <div className="card-box">
                <h3 className="card-title text-uppercase">Requests History</h3>
                {reqHist.length === 0 ?
                    <div>Budget's sheet is clean</div>
                    :
                    <div className="experience-box timeliness" style={{ maxHeight: 412, minHeight:412, overflowY: 'auto', overflowX: 'hidden' }}>
                        <ul className="experience-list">
                            {reqHist.map((item, index) => {
                                return (<TimeLine hist={item} key={index} />)
                            })}
                        </ul>
                    </div>
                }

            </div>
        </React.Fragment>
    )
}
