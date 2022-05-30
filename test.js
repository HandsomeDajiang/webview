function getToken() {
    // this.setupWKWebViewJavascriptBridge(function (bridge) {
    //     let params = {'appId': 'b4933e7b0c12f9c16a'}
    //     bridge.callHandler('getMiniProgramToken', params, function(response) {
    //         if (response) {
    //             console.log(response);
    //             document.getElementById('text').innerHTML = JSON.stringify(response);
    //         }
    //     });
    // });
    // window.top.postMessage(
    //     "发送的消息",
    //     "*"
    // );
    console.log("^&^&^&^&^&^&^&^^&^&^&^&");
    console.log(window.top);
    window.top.postMessage(
        "发送的消息",
        "*"
    );

}




window.onload = function(){
    const socket = new WebSocket("ws://localhost:9090");

    socket.onopen = () => {
        console.error("^&%&^%&%&%^&%&^%&%&%%&^%^&%^&%&%&^%&%&^%&%%");
        socket.send("Hello! i am aaa");
    };

    socket.onmessage = (data) => {
        console.log(data);
    };
}

window.onmessage = handelMessage;

function handelMessage(e){
    console.error("^&%&^%&%&%^&%&^%&%&%%&^%^&%^&%&%&^%&%&^%&%%");
    console.error(e);
}

function removeToken() {
    this.setupWKWebViewJavascriptBridge(function (bridge) {
        let params = {'appId': 'b4933e7b0c12f9c16a'}
        bridge.callHandler('removeMiniProgramToken', params, function(response) {
            if (response) {
                console.log(response);
                document.getElementById('text').innerHTML = JSON.stringify(response);
            }
        });
    });
}

function closeWindow() {
    this.setupWKWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler('closePage', null, function(response) {
            if (response) {
                console.log(response);
                document.getElementById('text').innerHTML = JSON.stringify(response);
            }
        });
    });
}