window.WKWebViewJavascriptBridge = {
    callHandler: callHandler,
};

class Bridge {
    callHandler(method,params,callback){
        callback(window.WKWVJBCallbacks[method](params));
    }
}

function callHandler(method, params, callback) {
    callback(window.WKWVJBCallbacks[method](params));
}

//  初始化
function initWKWebViewJavascriptBridge(callback) {
    window.WKWebViewJavascriptBridge = new Bridge();

    window.WKWVJBCallbacks['getMiniProgramToken'] = getMiniProgramToken;

    return callback(window.WKWebViewJavascriptBridge);
}

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
        setTimeout(()=>{
            clearInterval();
            resolve(window.miniProgramToken);
        });
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


