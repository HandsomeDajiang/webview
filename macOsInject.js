// window.onmessage = handelMessage;
// function handelMessage(e) {
//     const { callbackid, response } = e.data || {}
//     const { status } = response || {}
//     if (status && status === 400) {
//         clearInterval();
//         alert('error');
//         return
//     }
//
//     if (callbackid){
//         responseTempOperation(response, callbackid);
//         return;
//     }
//
//     clearInterval();
// }
// function responseTempOperation(response, callbackid) {
//     window.WKWVJBCallbacks[callbackid] = response;
// }
//
// const TARGET_ORIGIN = "file://*";
// window.WKWVJBCallbacks = {}
// window.WKWebViewJavascriptBridge = {
//     callHandler: callHandler,
// };
// async function callHandler(methodName, params, callback) {
//     callback(await postmessage(methodName,params));
// }
//
// async function postmessage(methodName, params) {
//     window.WKWVJBCallbacks = {};
//     const callbackid = new Date().getTime().toString();
//     const message = {
//         params,
//         callbackid,
//         methodName,
//     }
//
//     window.top.postMessage(
//         message,
//         TARGET_ORIGIN
//     );
//     return new Promise((resolve)=>{
//         const timer = setInterval(()=>{
//             if (window.WKWVJBCallbacks[callbackid]){
//                 clearInterval(timer);
//                 resolve(window.WKWVJBCallbacks[callbackid]);
//             }
//         },100);
//     });
// }
//
// function setupWKWebViewJavascriptBridge(callback) {
//     if (window.WKWebViewJavascriptBridge) {
//         return callback(window.WKWebViewJavascriptBridge);
//     }
//     return null;
// }
//
//
//
//
