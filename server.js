function getTokenToTextArea() {
    document.getElementById('text').innerHTML = getToken();
}

function getToken() {
    const timestamp = new Date().getTime().toString();
    window.Callbacks[timestamp] = _getToken;    // 绑定回调
    window.top.postMessage(
        {
            type: '2',
            callbackid: timestamp,
        },
        "file://*"
    );

    // 当token已经获取并被保存  就返回这个token
    while (true){
        if (window.token){
            return window.token;
        }
    }
}

const _getToken = (token) => {
    console.log(window.Callbacks);
    console.log(token);
    window.token = token
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

const handelMessage = (e) => {
    console.log("receive token：" + e.data.token.toString());
    console.log("receive callbackid：" + e.data.callbackid.toString());

    // 执行回调
    window.Callbacks[e.data.callbackid](e.data.token.toString());

    // 回调后清空，避免无限添加。
    window.Callbacks = {};
}

window.onload = function(){
    window.onmessage = handelMessage; // 监听消息
    window.Callbacks = {} // 全局回调对象，  key：随机id ， value：回调函数
}

