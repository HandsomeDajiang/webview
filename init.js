const TARGET_ORIGIN = "file://*";

window.WKWebViewJavascriptBridge = {
    callHandler: callHandler,
};

async function callHandler(methodName, params, callback) {
    callback(await postmessageWithParams(methodName,params));
}

function setupWKWebViewJavascriptBridge(callback) {
    if (window.WKWebViewJavascriptBridge) {
        return callback(window.WKWebViewJavascriptBridge);
    }
    return null;
}

async function postmessageWithParams(methodName, params) {
    window.WKWVJBCallbacks = {};
    const callbackid = new Date().getTime().toString();

    const message = {
        params,
        callbackid,
        methodName,
    }

    window.top.postMessage(
        message,
        TARGET_ORIGIN
    );

    return new Promise((resolve)=>{
        setInterval(()=>{
            if (window.WKWVJBCallbacks[callbackid]){
                clearInterval();
                resolve(window.WKWVJBCallbacks[callbackid]);
            }
        },20);
    });
}

function responseTempOperation(response, callbackid) {
    window.WKWVJBCallbacks[callbackid] = response;
}

function handelMessage(e) {
    const { callbackid, status } = e.data.response || {}

    if (status && status === 400) {
        clearInterval();
        alert('error');
        return
    }

    if (callbackid){
        responseTempOperation(e.data.response, callbackid);
    }
}

window.onmessage = handelMessage;
window.WKWVJBCallbacks = {}

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



