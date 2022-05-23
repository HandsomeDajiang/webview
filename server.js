//
// function closeWindow() {
//     window.top.postMessage(
//         {
//             type: '1',
//         },
//         "file://*"
//     );
// }
//
// async function getToken() {
//     window.miniProgramToken = undefined;
//     const timestamp = new Date().getTime().toString();
//     window.WKWVJBCallbacks[timestamp] = _getToken;
//     window.top.postMessage(
//         {
//             type: '2',
//             callbackid: timestamp
//         },
//         "file://*"
//     );
//     return new Promise((resolve)=>{
//         setInterval(()=>{
//             if (window.miniProgramToken){
//                 clearInterval();
//                 resolve(window.miniProgramToken);
//             }
//         },50);
//     });
// }
//
// async function getMiniProgramToken() {
//     const token = await getToken();
//     console.log(token);
//     document.getElementById('text').innerHTML = token.toString();
// }
//
// const _getToken = (response) => {
//     window.miniProgramToken = response;
// }
// const _removeToken = (response) => {
//     window.miniProgramTokenRemove = response;
// }
//
// async function removeMiniProgramToken() {
//     const result = await removeToken();
//     console.log(result.toString());
//     document.getElementById('text').innerHTML = result.toString();
// }
//
// async function removeToken() {
//     window.miniProgramTokenRemove = undefined;
//     const timestamp = new Date().getTime().toString();
//     window.WKWVJBCallbacks[timestamp] = _removeToken;
//     window.top.postMessage(
//         {
//             type: '3',
//             callbackid: timestamp
//         },
//         "file://*"
//     );
//     return new Promise((resolve)=>{
//         setInterval(()=>{
//             if (window.miniProgramTokenRemove){
//                 clearInterval();
//                 resolve(window.miniProgramTokenRemove);
//             }
//         },50);
//     });
// }
//
// const handelMessage = (e) => {
//     const callbackid = e.data.callbackid;
//     if (callbackid){
//         window.WKWVJBCallbacks[callbackid](e.data.response);
//     }
// }
//
// window.onload = function(){
//     const setupWKWebViewJavascriptBridge = (callback) => {
//         if (!window.WKWebViewJavascriptBridge) { //  适配 mac 端。
//             return  callback();
//         }
//         if (window.WKWebViewJavascriptBridge) {
//             return callback(window.WKWebViewJavascriptBridge);
//         }
//     }
// }
//
//
//
//
