export default function removeInvalidToken(){
    sessionStorage.removeItem('token');
    window.location.reload()
}