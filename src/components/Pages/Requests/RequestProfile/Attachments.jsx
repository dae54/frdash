import React from 'react'
import URL from '../../../../URL'
import AddAttachment from './AddAttachments'

export default function Attachments({ requestId, attachments }) {
    return (
        <React.Fragment>
            <div className="row">
                <div className="col">
                    <div className="card">
                        <div className="card-header">
                            Supportive Documents
                            <button className='btn btn-info float-right' data-toggle="modal" data-target="#addAttachmentsModal">+</button>
                        </div>
                        <AddAttachment requestId={requestId} />
                        <div className="card-body">
                            {!attachments.length ?
                                <div className="text-center">
                                    No documents uploaded yet
                                </div>
                                :
                                <div className="row">
                                    {attachments.map(item => {
                                        return (<ImageComp attachment={item} />)
                                    })}
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

const ImageComp = ({ attachment }) => {
    return (
        <div className="col-3">
            <a href={URL + `/attachments/${attachment.name}`} data-title={attachment.name} data-lightbox="attachment">
                <img src={URL + `/attachments/${attachment.name}`} alt='attachments' className="img-thumbnail"/>
            </a>
        </div>
    )
}