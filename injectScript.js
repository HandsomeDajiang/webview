function getToken() {
    return new Promise((resolve, reject) => {
        const timestamp = new Date().getTime().toString();
        window.Callbacks[timestamp] = _getToken
        window.top.postMessage(
            {
                type: '2',
                callbackid: timestamp,
            },
            "file://*"
        );
    });
}

const _getToken = async (token) => {
    console.log(window.Callbacks)
    // 回调后销毁，避免无限添加
    window.Callbacks = {};
    
    return new Promise((resolve, reject) => {
        console.log(token);
        resolve(token);
    });
}

function closeWindow() {
    window.top.postMessage(
        {
            type: '1'
        },
        "file://*"
    );
}

function removeToken() {
    window.top.postMessage(
        {
            type: '3'
        },
        "file://*"
    );
}

const handelMessage = async (e) => {
    console.log("receive token：" + e.data.token.toString());
    console.log("receive callbackid：" + e.data.callbackid.toString());

    // 执行回调
    await window.Callbacks[e.data.callbackid](e.data.token.toString())
}

window.onload = function(){
    window.onmessage = handelMessage; // 监听消息
    window.Callbacks = {} // 全局回调对象，  key：随机id ， value：回调函数
}

