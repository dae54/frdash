import jwt_decode from 'jwt-decode'


module.exports = {
    validateToken: async (req, res) => {
        var userSession = jwt_decode(sessionStorage.getItem('token'))
        if (userSession) {
            if ((Date.now() <= userSession.exp * 1000)) {
                return true
            } else {
                alert("your session has expired. Please log in again to use our services")
                removeToken()
                return false
            }
        } else {
            alert("your are not authenticated. Please log in to use our services")
            removeToken()
            return false
        }
    }
}

const removeToken = () => {
    sessionStorage.removeItem('token');
    window.location.reload()
}