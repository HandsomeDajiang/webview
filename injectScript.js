class Bridge {
    constructor() {
        window.addEventListener('message',function(e){
            console.log("receive data：" + e.data.toString());
            alert("receive data：" + e.data.toString());
        });
    }

    getToken() {
        window.top.postMessage(
            {
                msg:'get token',
                type: 2
            },
            "file://*"
        );
    }

    closeWindow() {
        window.top.postMessage(
            {
                msg:'close webview',
                type: 1
            },
            "file://*"
        );
    }

    removeToken() {
        window.top.postMessage(
            {
                msg:'remove token',
                type: 3
            },
            "file://*"
        );
    }
}
window.onload = function(){
    // window.NativeBridge = new Bridge();
    window.addEventListener('message',function(e){
        console.log("receive data：" + e.data.toString());
        if (e.data.type === 1){
            document.getElementsByTagName('head')[0].append(e.data.data);
        }
        // alert("receive data：" + e.data.toString());
    });
}

