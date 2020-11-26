// /**
//  * @param data
//  * the array data to be sorted
//  * @param key
//  * the key parameter to be used to sort @param data
//  * @example 
//  * */

// export const sortArray = (data, key) => {
//     let result = data.sort((a, b) => {
//         let x = a[key]
//         let y = b[key]
//         return ((x < y) ? -1 : ((x > y) ? 1 : 0))
//     })
//     return result
// }

// export const printComponent = () => {
//     var myWindow = window.open('', 'PRINT', 'height=400,width=600')

//     // myWindow.document.write('<html><head><title>'+document.title+)
// }
// export const validateToken = () => {
//     const token = sessionStorage.getItem('token')
//     if (token) {
//         console.log('i have token')
//         return true
//     } else {
//         console.log('no have token')
//         removeToken()
//         return false
//     }
// }

// export const getUserDetails = () => {
//     console.log('getUserDetails')
//     // axios.post('/user/login', {

//     await axios.get('http://localhost:8080/user/permission', {
//         headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//             // `Bearer ${localStorage.getItem('token')}
//         }
//     })
//         .then(res => {
//             console.log(res.data)
//         })
//         .catch(error => {
//             console.log(error.message)
//         })
//     // return 'helow there'
// }