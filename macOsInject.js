const TARGET_ORIGIN = "file://*";

function macOsInjectWKWebViewJavascriptBridge() {
    window.WKWVJBCallbacks = {}
    window.onmessage = handelMessage;
    window.WKWebViewJavascriptBridge = {
        callHandler: callHandler,
    };
    window.setupWKWebViewJavascriptBridge = setupWKWebViewJavascriptBridge
}

function handelMessage(e){
    const { callbackid, response } = e.data || {}
    const { status } = response || {}

    if (!status) {
        window.clearInterval();
        alert('error callback data!');
        return
    }

    switch (status) {
        case 400:
            alert('error 400');
            window.clearInterval();
            return;
        default:
            console.log('continue...');
    }

    if (callbackid){
        return responseTempOperation(response, callbackid);
    }

    console.log("9999999");
    window.clearInterval();
}

function responseTempOperation(response, callbackid) {
    window.WKWVJBCallbacks[callbackid] = response;
}


async function callHandler(methodName, params, callback) {
    callback(await postmessage(methodName,params));
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