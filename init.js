window.WKWebViewJavascriptBridge = {
    callHandler: callHandler,
};
async function callHandler(method, params, callback) {
    params ? callback(await window.WKWVJBCallbacks[method](params)) : callback(await window.WKWVJBCallbacks[method]());
}

function setupWKWebViewJavascriptBridge(callback) {
    if (window.WKWebViewJavascriptBridge) {
        return callback(window.WKWebViewJavascriptBridge);
    }
    return null;
}



async function removeMiniProgramToken(params) {
    window.miniProgramRemoveToken = undefined
    const timestamp = new Date().getTime().toString();
    window.WKWVJBTempCallbacks[timestamp] = removeTokenOperation;
    window.top.postMessage(
        {
            params,
            callbackid: timestamp,
            type: '3'
        },
        "file://*"
    );
    return new Promise((resolve)=>{
        setInterval(()=>{
            if (window.miniProgramRemoveToken){
                clearInterval();
                resolve(window.miniProgramRemoveToken);
            }
        },20);
    });
}

async function getMiniProgramToken(params) {
    window.miniProgramGetToken = undefined
    const timestamp = new Date().getTime().toString();
    window.WKWVJBTempCallbacks[timestamp] = getTokenOperation;
    window.top.postMessage(
        {
            params,
            callbackid: timestamp,
            type: '2'
        },
        "file://*"
    );
    return new Promise((resolve)=>{
        setInterval(()=>{
            if (window.miniProgramGetToken){
                clearInterval();
                resolve(window.miniProgramGetToken);
            }
        },20);
    });
}

function closePage() {
    window.top.postMessage(
        {
            type: '1'
        },
        "file://*"
    );
}

function getTokenOperation(response) {
    window.miniProgramGetToken = response;
}

function removeTokenOperation(response) {
    window.miniProgramRemoveToken = response;
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
window.WKWVJBCallbacks['removeMiniProgramToken'] = removeMiniProgramToken;
window.WKWVJBCallbacks['closePage'] = closePage;

function getToken() {
    this.setupWKWebViewJavascriptBridge(function (bridge) {
        let parms = {'appId': 'b4933e7b0c12f9c16a'}
        bridge.callHandler('getMiniProgramToken', parms, function(response) {
            if (response) {
                console.log(response);
                const { status, token } = response;
                document.getElementById('text').innerHTML = token
            }
        });
    });
}

function removeToken() {
    this.setupWKWebViewJavascriptBridge(function (bridge) {
        let parms = {'appId': 'b4933e7b0c12f9c16a'}
        bridge.callHandler('removeMiniProgramToken', parms, function(response) {
            if (response) {
                console.log(response);
            }
        });
    });
}

function closeWindow() {
    this.setupWKWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler('closePage', null, function(response) {
            if (response) {
                console.log(response);
            }
        });
    });
}



