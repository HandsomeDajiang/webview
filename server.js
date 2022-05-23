function closeWindow() {
    window.top.postMessage(
        {
            type: '1',
        },
        "file://*"
    );
}

async function getToken() {
    window.miniProgramToken = undefined;
    const timestamp = new Date().getTime().toString();
    window.WKWVJBCallbacks[timestamp] = _getToken;
    window.top.postMessage(
        {
            type: '2',
            callbackid: timestamp
        },
        "file://*"
    );
    return new Promise((resolve)=>{
        setInterval(()=>{
            if (window.miniProgramToken){
                clearInterval();
                resolve(window.miniProgramToken);
            }
        },50);
    });
}

async function getMiniProgramToken() {
    const token = await getToken();
    console.log(token.data.toString());
    document.getElementById('text').innerHTML = token.data.toString();
}

const _getToken = (response) => {
    window.miniProgramToken = response;
}
const _removeToken = (response) => {
    window.miniProgramTokenRemove = response;
}

async function removeMiniProgramToken() {
    const result = await removeToken();
    console.log(result.data.toString());
    document.getElementById('text').innerHTML = result.data.toString();
}

function removeToken() {
    window.miniProgramTokenRemove = undefined;
    const timestamp = new Date().getTime().toString();
    window.WKWVJBCallbacks[timestamp] = _removeToken;
    window.top.postMessage(
        {
            type: '3',
            callbackid: timestamp
        },
        "file://*"
    );
    return new Promise((resolve)=>{
        setInterval(()=>{
            if (window.miniProgramTokenRemove){
                clearInterval();
                resolve(window.miniProgramTokenRemove);
            }
        },50);
    });
}

const handelMessage = (e) => {
    const callbackid = e.data.callbackid;
    if (callbackid){
        window.WKWVJBCallbacks[callbackid](e.data.response);
    }
}

window.onload = function(){
    window.onmessage = handelMessage; // 监听消息

    //清空一下，避免无限添加。
    window.WKWVJBCallbacks = {} // 全局回调对象，  key：随机id ， value：回调函数
}



