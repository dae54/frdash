import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'

export default function Remarks(props) {
    let { refreshRemarks, setRefreshRemarks } = props

    const [newRemark, setNewRemark] = useState('')
    const [newRemarkStatus, setNewRemarkStatus] = useState({ error: '', isLoading: false })
    const [remarks, setRemarks] = useState([])
    const [remarkInitStatus, setRemarkInitStatus] = useState({ error: '', isLoading: false })

    async function fetchRemarks() {
        setRemarkInitStatus({ error: '', isLoading: true })
        await axios.get('requests/remarks/', {
            params: {
                requestId: props.requestId,
            }
        }).then(response => {
            console.log(response)
            setRemarkInitStatus({ error: '', isLoading: false })
            setRemarks(response.data.data.remarks)
        }).catch(error => {
            setRemarkInitStatus({ error: error.response, isLoading: false })
            console.log(error.response)
        })
    }

    async function handleSubmitRemark(e) {
        setNewRemarkStatus({ error: '', isLoading: true })
        e.preventDefault();
        await axios.put('requests/remarks', {
            requestId: props.requestId,
            remark: newRemark
        }).then(() => {
            setNewRemarkStatus({ error: '', isLoading: false })
            setNewRemark() //clear remark text field
            fetchRemarks()   //refresh remark list
        }).catch(error => {
            console.log(error.response)
            setNewRemarkStatus({ error: error.response, isLoading: false })
        })
    }

    async function handleDeleteRemark(e) {
        let conf = window.confirm('You are about to delete a remark. bear in mind that this process is not reversible')
        if (conf) {
            await axios.delete(`requests/${props.requestId}/remark/${e.target.id}`)
                .then(response => {
                    if (response.data.status) {
                        fetchRemarks()
                    }
                })
                .catch(error => {
                    console.log('error')
                    console.log(error)
                })
        } else return
    }

    useEffect(() => {
        fetchRemarks()
        return () => {
            console.log('cleaning')
        }
    }, [])

    useEffect(() => {
        if (refreshRemarks) {
            fetchRemarks()
            setRefreshRemarks(false)
        }
    }, [refreshRemarks])

    return (
        <React.Fragment>
            <div className="card">
                <div className="card-header pb-2">
                    <h4 className='text-dark'>Remarks</h4>
                    <div className="btn btn-info" onClick={fetchRemarks}><i className="fa fa-user"></i></div>
                </div>
                <div className="card-body pt-0">
                    <p className="text-uppercase text-muted">Comments from the admins</p>
                    <form className='d-flex pb-3' onSubmit={handleSubmitRemark}>
                        <input className='form-control mr-3 bg-light border-top border-right border-left shadow-sm bg-white'
                            placeholder='Add Remarks'
                            type="text"
                            value={newRemark}
                            onChange={(e) => setNewRemark(e.target.value)}
                            required
                        />
                        {newRemarkStatus.isLoading ?
                            <button className='btn btn-info btn-sm float-right' disabled style={{ cursor: 'progress' }}>
                                <div class="spinner-border text-dark spinner-border-sm" role="status"></div>
                            </button>
                            :
                            <button type="submit" className='btn btn-info float-right'>Submit</button>
                        }
                    </form>
                    {remarkInitStatus.isLoading ?
                        <div>
                            {Array.from({ length: 2 }, () => {
                                return (
                                    <div className="card p-2 text-dark blink_me">
                                        <h5 className='text-dark blur'>
                                            Lorem ipsum dolor sit amet
                                    </h5>
                                        <span className='pb-1 text-muted text-monospace blur'>Root Admin, 12/02/2020 12:11 PM</span>
                                    </div>
                                )
                            })}
                            <div class="spinner-border text-dark spinner-border-sm" role="status"></div> Please wait
                        </div>
                        :
                        <div style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                            {remarks.map(remark => {
                                return (
                                    <div className="card p-2 bg-dange mb-1">
                                        <h5 className='text-default'>
                                            {remark.message}
                                            <span className="btn badge bg-white p-1 text-white float-right border" onClick={(e) => handleDeleteRemark(e)}>
                                                <i className="fa fa-trash text-default" style={{ fontSize: 15 }} id={remark._id}></i>
                                            </span>
                                        </h5>
                                        <span className='pb-1 text-muted text-monospace'>
                                            {`${remark.author.firstName} ${remark.author.lastName}`}, &nbsp;
                                            {moment(remark.createdAt).fromNow()}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    }
                </div>
            </div>
        </React.Fragment>
    )
}