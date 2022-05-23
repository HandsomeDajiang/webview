function closeWindow() {
    window.top.postMessage(
        {
            type: '1',
        },
        "file://*"
    );
}

async function getWebToken() {
    const timestamp = new Date().getTime().toString();
    window.Callbacks[timestamp] = _getToken();
    window.top.postMessage(
        {
            type: '2',
            callbakcid: timestamp
        },
        "file://*"
    );
    return new Promise((resolve)=>{
        setInterval(()=>{
            if (window.token){ // 已经有了
                clearInterval();
                resolve(window.token);
            }
        },100);
    });
}

async function getToken() {
    const token = await getWebToken();
    console.log(token);
    document.getElementById('text').innerHTML = token.toString();
}

function _getToken(token) {
    window.token = token;
}

function removeToken() {
    window.top.postMessage(
        {
            type: '3',
        },
        "file://*"
    );
}

const handelMessage = (e) => {
    const callbackid = e.data.callbackid;
    if (callbackid){
        window.Callbacks[callbackid](e.data.data);
    }
}

window.onload = function(){
    window.onmessage = handelMessage; // 监听消息

    // 最后清空一下，避免无限添加。
    window.Callbacks = {} // 全局回调对象，  key：随机id ， value：回调函数
}

