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
    window.top.postMessage(
        "发送的消息",
        "*"
    );
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