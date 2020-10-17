import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

export default function DemoReqAttachment({ requestId }) {
    console.log(requestId)
    const hist = useHistory()

    const [file, setFile] = useState('')
    function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append('attachment', file)
        formData.append('requestID', requestId)
        axios.post(`/requests/attach`, formData)
            .then(res => {
                // console.log(res.data.data)
                // var newState = 
                hist.replace({ state: hist.location.state.attachments.push(res.data.data) })
            }).catch(error => {
                console.log(error.response)
            })
    }
    return (
        <React.Fragment>
            <div className="modal fade" id="addAttachmentsModal" tabIndex="-1" role="dialog" aria-labelledby="addAttachmentsModal" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalScrollableTitle">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col">
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <label className='col-3'>Select attachment</label>
                                            <div className="col">
                                                <input type="file" name="attachment" className='form-control' id="" onChange={e => setFile(e.target.files[0])} required />
                                            </div>
                                        </div>
                                        <button type="submit" className='btn btn-info'> Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
