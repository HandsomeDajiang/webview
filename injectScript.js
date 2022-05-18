// class User {
//     constructor() {
//         window.addEventListener('message',function(e){
//             console.log("receive data：" + e.data.toString());
//             alert("receive data：" + e.data.toString());
//             this.token = e.data.toString();
//         });
//     }
//
//     getToken() {
//         window.top.postMessage(
//             {
//                 msg:'get token',
//                 type: 2
//             },
//             "file://*"
//         );
//     }
//
//     closeWindow() {
//         window.top.postMessage(
//             {
//                 msg:'close webview',
//                 type: 1
//             },
//             "file://*"
//         );
//     }
//
//     removeToken() {
//         window.top.postMessage(
//             {
//                 msg:'remove token',
//                 type: 3
//             },
//             "file://*"
//         );
//     }
// }
// window.onload = function(){
//     window.utils = new User();
// }
//
