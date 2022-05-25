const TARGET_ORIGIN = "file://*";

// 初始化
function macOsInjectWKWebViewJavascriptBridge() {
    window.WKWVJBCallbacks = {}
    window.onmessage = handelMessage;
    window.WKWebViewJavascriptBridge = {
        callHandler: callHandler,
    };
    window.setupWKWebViewJavascriptBridge = setupWKWebViewJavascriptBridge
}

// 处理postmessage回调
function handelMessage(e){
    console.log(e.data)
    const { callbackid, response } = e.data || {}
    const { status } = response || {}

    if (!status) {
        window.clearInterval();
        alert('error callback data!');
        return;
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

    window.clearInterval();
}

// 回调数据临时存储
function responseTempOperation(response, callbackid) {
    window.WKWVJBCallbacks[callbackid] = response;
}

// getToken、removeToken、closePage 等触发事件
async function callHandler(methodName, params, callback) {
    callback(await postmessage(methodName,params));
}

// postmessage
async function postmessage(methodName, params) {
    if (!methodName) {
        alert("methodName could not be empty！");
        return ;
    }
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