async function getToken() {
    return new Promise((resolve, reject) => {
        window.top.postMessage(
            {
                msg:'get token',
                type: 2,
                callback: (token)=>{resolve(token)},
            },
            "file://*"
        );
    })
}

function closeWindow() {
    window.top.postMessage(
        {
            msg:'close webview',
            type: 1
        },
        "file://*"
    );
}

function removeToken() {
    window.top.postMessage(
        {
            msg:'remove token',
            type: 3
        },
        "file://*"
    );
}

const handelMessage = (e) => {
    console.log("receive data：" + e.data.token.toString());
    alert("receive data：" + e.data.token.toString());
    // 执行回调
    e.data.callback(e.data.token.toString());
}

window.onload = function(){
    window.onmessage = handelMessage;
}

