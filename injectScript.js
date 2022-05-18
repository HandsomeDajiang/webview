function getToken() {
    let token = '';
    window.top.postMessage(
        {
            msg:'get token',
            type: 2
        },
        "file://*"
    );
    return token;
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
    console.log("receive data：" + e.data.toString());
    alert("receive data：" + e.data.toString());
}

window.onload = function(){
    window.onmessage = handelMessage;
}

