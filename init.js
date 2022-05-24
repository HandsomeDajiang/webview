export function inject() {
    const TARGET_ORIGIN = "file://*";
    window.onmessage = handelMessage;
    window.WKWVJBCallbacks = {}

    window.WKWebViewJavascriptBridge = {
        callHandler: callHandler,
    };

    async function callHandler(methodName, params, callback) {
        callback(await postmessage(methodName,params));
    }

    function setupWKWebViewJavascriptBridge(callback) {
        if (window.WKWebViewJavascriptBridge) {
            return callback(window.WKWebViewJavascriptBridge);
        }
        return null;
    }

    async function postmessage(methodName, params) {
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
            const timer = setInterval(()=>{
                if (window.WKWVJBCallbacks[callbackid]){
                    clearInterval(timer);
                    resolve(window.WKWVJBCallbacks[callbackid]);
                }
            },100);
        });
    }

    function responseTempOperation(response, callbackid) {
        window.WKWVJBCallbacks[callbackid] = response;
    }

    function handelMessage(e) {
        const { callbackid, response } = e.data || {}
        const { status } = response || {}
        if (status && status === 400) {
            clearInterval();
            alert('error');
            return
        }

        if (callbackid){
            responseTempOperation(response, callbackid);
            return;
        }

        clearInterval();
    }
}

function getToken() {
    this.setupWKWebViewJavascriptBridge(function (bridge) {
        let params = {'appId': 'b4933e7b0c12f9c16a'}
        bridge.callHandler('getMiniProgramToken', params, function(response) {
            console.log("回来的数据：" + response);
            if (response) {
                console.log("##########");
                console.log(response);
                const { status, token } = response;
                document.getElementById('text').innerHTML = token
            }
        });
    });
}

function removeToken() {
    this.setupWKWebViewJavascriptBridge(function (bridge) {
        let params = {'appId': 'b4933e7b0c12f9c16a'}
        bridge.callHandler('removeMiniProgramToken', params, function(response) {
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


