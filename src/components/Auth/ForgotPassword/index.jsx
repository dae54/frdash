import React, { useState } from 'react'
import ConfirmEmail from './ConfirmEmail'
import NewPassword from './NewPassword'

export default function ResetPassword() {
    const [emailValid, setEmailValid] = useState(false)
    const [codeValid, setCodeValid] = useState(false)

    return (
        <React.Fragment>
            {!emailValid &&
                <ConfirmEmail setEmailValid={setEmailValid} />
            }
            {emailValid && !codeValid &&
                <NewPassword setCodeValid={setCodeValid} />
            }
        </React.Fragment>
    )
}
