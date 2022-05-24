// export function injectMacOsBridge() {
//     window.onmessage = handelMessage;
//     function handelMessage(e) {
//         const { callbackid, response } = e.data || {}
//         const { status } = response || {}
//         if (status && status === 400) {
//             clearInterval();
//             alert('error');
//             return
//         }
//
//         if (callbackid){
//             responseTempOperation(response, callbackid);
//             return;
//         }
//
//         clearInterval();
//     }
//     function responseTempOperation(response, callbackid) {
//         window.WKWVJBCallbacks[callbackid] = response;
//     }
//     const TARGET_ORIGIN = "file://*";
//     window.WKWVJBCallbacks = {}
//     window.WKWebViewJavascriptBridge = {
//         callHandler: callHandler,
//     };
//     async function callHandler(methodName, params, callback) {
//         callback(await postmessage(methodName,params));
//     }
//     async function postmessage(methodName, params) {
//         window.WKWVJBCallbacks = {};
//         const callbackid = new Date().getTime().toString();
//         const message = {
//             params,
//             callbackid,
//             methodName,
//         }
//
//         window.top.postMessage(
//             message,
//             TARGET_ORIGIN
//         );
//         return new Promise((resolve)=>{
//             const timer = setInterval(()=>{
//                 if (window.WKWVJBCallbacks[callbackid]){
//                     clearInterval(timer);
//                     resolve(window.WKWVJBCallbacks[callbackid]);
//                 }
//             },100);
//         });
//     }
// }
//
// function setupWKWebViewJavascriptBridge(callback) {
//     if (window.WKWebViewJavascriptBridge) {
//         return callback(window.WKWebViewJavascriptBridge);
//     }
//     return null;
// }


class Bridge {
    constructor() {
        window.WKWVJBCallbacks = {}
        window.WKWebViewJavascriptBridge = {
            callHandler: this.callHandler,
        };
        window.TARGET_ORIGIN =  "file://*";
        window.onmessage = this.handelMessage;
        window.setupWKWebViewJavascriptBridge = this.setupWKWebViewJavascriptBridge;
    }
    setupWKWebViewJavascriptBridge(callback) {
        if (window.WKWebViewJavascriptBridge) {
            return callback(window.WKWebViewJavascriptBridge);
        }
        return null;
    }
    handelMessage(e){
        const { callbackid, response } = e.data || {}
        const { status } = response || {}
        if (status && status === 400) {
            clearInterval();
            alert('error');
            return
        }

        if (callbackid){
            this.responseTempOperation(response, callbackid);
        }
    }
    responseTempOperation(response, callbackid) {
        window.WKWVJBCallbacks[callbackid] = response;
    }
    async callHandler(methodName, params, callback) {
        const response = await Bridge.postmessage(methodName,params)
        callback(response);
    }
    async postmessage(methodName, params) {
        window.WKWVJBCallbacks = {};
        const callbackid = new Date().getTime().toString();
        const message = {
            params,
            callbackid,
            methodName,
        }

        window.top.postMessage(
            message,
            window.TARGET_ORIGIN
        );

        return new Promise((resolve)=>{
            const timer = setInterval(()=>{
                if (window.WKWVJBCallbacks[callbackid]){
                    clearInterval(timer);
                    resolve(window.WKWVJBCallbacks[callbackid]);
                }
            },100);
        });
    }
}
