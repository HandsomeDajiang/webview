class Bridge {
    callHandler(method,params,callback){
       // window.WKWVJBCallbacks[method](params)  返回 promise
        callback(window.WKWVJBCallbacks[method](params));
    }
}
const bridge = new Bridge();

const getMiniProgramToken = async function(params) {
    return await getToken(params);
}

const getToken = async function(params) {
    window.miniProgramToken = undefined;
    const timestamp = new Date().getTime().toString();
    window.WKWVJBTempCallbacks[timestamp] = _getToken;
    window.top.postMessage(
        {
            type: '2',
            callbackid: timestamp,
            params
        },
        "file://*"
    );
    return new Promise((resolve)=>{
        setInterval(()=>{
            if (window.miniProgramToken){
                clearInterval();
                resolve(window.miniProgramToken);
            }
        },50);
    });
}

const _getToken = function(response) {
    window.miniProgramToken = response;
}

const handelMessage = function(e) {
    const callbackid = e.data.callbackid;
    if (callbackid){
        window.WKWVJBTempCallbacks[callbackid](e.data.response);
    }

    // 执行完回调后清空 WKWVJBTempCallbacks 避免无限添加。
    window.WKWVJBTempCallbacks = {}
}


window.onmessage = handelMessage;
window.WKWVJBCallbacks = {}
window.WKWVJBTempCallbacks = {}

window.WKWVJBCallbacks['getMiniProgramToken'] = getMiniProgramToken;    // 注册方法并绑定到 window 全局对象上。

this.setupWKWebViewJavascriptBridge = (function(){
    let parms = {'appId': 'b4933e7b0c12f9c16a'}
    bridge.callHandler('getMiniProgramToken', parms, function(response) {
        console.log("$$$$$$$$");
        console.log(response);
    })
})
