import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import axios from 'axios'
// import * as serviceWorker from './serviceWorker';
// import URL from './URL'
// import notificationListener from './notificationListener'
// Notification.requestPermission(status => {
//     console.log('notification status ', status)
// })

// if (Notification.permission == 'granted') {
//     navigator.serviceWorker.getRegistration().then(reg => {
//         console.log('reg')
//         reg.showNotification('Hello Daniel')
//     })
//     .catch(error=>{
//         console.log(error)
//     })
// }
// if ('serviceWorker' in navigator) {
//     send().catch(err => console.log(err))
// }
// async function send() {
//     const PUBLIC_VAPID_KEY = 'BCZyLWPHnDuSN01-Djq93ZoE6sdEkljHSVmYb2jdH5h290vPCuMOZmp-l_yHFhsr08yU-8bKZpydvBp1GaUI0p4'
//     // register service worker

//     const register = await serviceWorker.register();
//     // console.log(register)

//     // register push
//     register.pushManager.subscribe({
//         userVisibleOnly: true,
//         applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY),
//     }).then(subscription => {
//         console.log('here again')
//         axios.post(`${URL}/notifications/subscribe`, {
//             subscription})
//         // }).then(response => {
//         //     // console.log(response)
//         // }).catch(e => {
//         //     console.log(e.response)
//         // })
//     })
//     // console.log(subscription)
//     // send push notification
//     console.log('object')

// }



// function urlBase64ToUint8Array(base64String) {
//     const padding = '='.repeat((4 - base64String.length % 4) % 4);
//     const base64 = (base64String + padding)
//         .replace(/-/g, '+')
//         .replace(/_/g, '/');

//     const rawData = window.atob(base64);
//     const outputArray = new Uint8Array(rawData.length);

//     for (let i = 0; i < rawData.length; ++i) {
//         outputArray[i] = rawData.charCodeAt(i);
//     }
//     return outputArray;
// }

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.register();
