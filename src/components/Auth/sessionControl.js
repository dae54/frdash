import jwt_decode from 'jwt-decode'

export const validateToken = () => {
    const token = sessionStorage.getItem('token')
    if (token) {
        console.log('i have token')
        return true
    } else {
        console.log('no have token')
        removeToken()
        return false
    }
}
export const validateSession = () => {
    console.log('am in validate token')
    const token = sessionStorage.getItem('token')
    if (token) {
        try {
            var decoded = tokenParams();
            if ((Date.now() <= decoded.exp * 1000)) {
                return true
            } else {
                // removeToken()
                return false
            }
        } catch (e) {
            removeToken()
            return false
        }
    }
    else {
        // removeToken()
        return false
    }
}

export const removeToken = () => {
    sessionStorage.removeItem('token');
}

/**
 * Function to call when user is idle
*/
export const monitorIdleTime = (setStatus) => {
    // let status = true
    //if idle for 30 minutes, log the user out
    //remove the token
    // let initialTime = 10
    // let idleTime = setInterval(() => {
    //     --initialTime
    //     console.log(initialTime)
    //     if (initialTime === 0) {
    //         clearInterval(idleTime)
    //         setStatus(false)
    //     }
    // }, 1000)

    // return status
    // console.log(initialTime)
}
export const tokenParams = () => {
    try {
        return jwt_decode(sessionStorage.getItem('token')) || jwt_decode(sessionStorage.getItem('ttuser'));
    } catch (e) {
        return false
    }
}
// export function add(x, y) {
//     return x + y
// }

// export function mutiply(x, y) {
//     return x * y
// }