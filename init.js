window.WKWebViewJavascriptBridge = {
    callHandler: callHandler,
};

function callHandler(method, params, callback) {
    callback(window.WKWVJBCallbacks[method](params));
}

async function getMiniProgramToken(params) {
    window.miniProgramToken = undefined;
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
        setTimeout(()=>{
            clearInterval();
            resolve(window.miniProgramToken);
        });
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
    // this.setupWKWebViewJavascriptBridge(function (bridge) {
        let parms = {'appId': 'b4933e7b0c12f9c16a'}
        window.WKWebViewJavascriptBridge.callHandler('getMiniProgramToken', parms, function(response) {
            console.log("$$$$$$$$");
            console.log(response);
            console.log(response.result);
        });
    // });
}


