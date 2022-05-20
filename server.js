async function getWebToken() {
    window.top.postMessage(
        {
            type: '2',
        },
        "file://*"
    );
    return new Promise((resolve)=>{
        setInterval(()=>{
            if (window.token){ // 已经有了
                clearInterval();
                resolve(window.token);
            }
        },100)
    });
}

async function getToken() {
    const token = await getWebToken();
    document.getElementById('text').innerHTML = token.result.data.toString();
}

const handelMessage = (e) => {
    console.log("receive token：" + e.data.token.toString());
    console.log("receive callbackid：" + e.data.callbackid.toString());
}

window.onload = function(){
    window.onmessage = handelMessage; // 监听消息
    window.Callbacks = {} // 全局回调对象，  key：随机id ， value：回调函数
}

