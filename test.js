function getToken() {
    this.setupWKWebViewJavascriptBridge(function (bridge) {
        let params = {'appId': 'b4933e7b0c12f9c16a'}
        bridge.callHandler('getMiniProgramToken', params, function(response) {
            console.log("回来的数据：" + response);
            if (response) {
                console.log("##########");
                console.log(response);
                const { status, token } = response;
                document.getElementById('text').innerHTML = token
            }
        });
    });
}

function removeToken() {
    this.setupWKWebViewJavascriptBridge(function (bridge) {
        let params = {'appId': 'b4933e7b0c12f9c16a'}
        bridge.callHandler('removeMiniProgramToken', params, function(response) {
            if (response) {
                console.log(response);
            }
        });
    });
}

function closeWindow() {
    this.setupWKWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler('closePage', null, function(response) {
            if (response) {
                console.log(response);
            }
        });
    });
}