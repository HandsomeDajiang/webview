async function getToken() {
    const timestamp = new Date().getTime().toString();
    window.Callbacks[timestamp] = _getToken
    window.top.postMessage(
        {
            type: '2',
            callbackid: timestamp,
        },
        "file://*"
    );
}

const _getToken = async (token) => {
    return new Promise((resolve, reject) => {
        console.log("77777");
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

const handelMessage = (e) => {
    console.log("receive token：" + e.data.token.toString());
    console.log("receive callbackid：" + e.data.callbackid.toString());

    // 执行回调
    window.Callbacks[e.data.callbackid](e.data.token.toString())
}

window.onload = function(){
    window.onmessage = handelMessage;

    window.Callbacks = {}
}

