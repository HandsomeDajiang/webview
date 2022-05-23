window.WKWebViewJavascriptBridge = {
    callHandler: callHandler,
};

function setupWKWebViewJavascriptBridge(callback) {
    if (window.WKWebViewJavascriptBridge) {
        return callback(window.WKWebViewJavascriptBridge);
    }
    return null;
}

async function callHandler(method, params, callback) {
    callback(await window.WKWVJBCallbacks[method](params));
}

async function getMiniProgramToken(params) {
    window.miniProgramToken = undefined
    const timestamp = new Date().getTime().toString();
    window.WKWVJBTempCallbacks[timestamp] = getToken;
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
            // 有数据了,并且是新的。  通过时间戳来判断新旧。
            if (window.miniProgramToken){
                clearInterval();
                resolve(window.miniProgramToken);
            }
        },20);
    });
}

function getToken(response) {
    window.miniProgramToken = response;
}

function handelMessage(e) {
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

window.WKWVJBCallbacks['getMiniProgramToken'] = getMiniProgramToken;

function getTTT() {
    this.setupWKWebViewJavascriptBridge(function (bridge) {
        let parms = {'appId': 'b4933e7b0c12f9c16a'}
        bridge.callHandler('getMiniProgramToken', parms, function(response) {
            console.log("$$$$$$$$");
            console.log(response);
            console.log(response.result);
        });
    });
}


