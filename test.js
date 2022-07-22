function getToken(){
    setupWKWebViewJavascriptBridge(function(bridge) {
        bridge.callHandler('getMiniProgramToken',{},function(response) {
            console.error('手动获取token');
            console.error(response);
        });
    });
}

function removeToken() {
    setupWKWebViewJavascriptBridge(function(bridge) {
        bridge.callHandler('removeMiniProgramToken',{},function(response) {
            console.error('手动移除token');
            console.error(response);
        });
    });
}

function closePage() {
    setupWKWebViewJavascriptBridge(function(bridge) {
        bridge.callHandler('closePage',{},function(response) {
            console.error('手动关闭window');
            console.error(response);
        });
    });
}

function setTitle() {
    setupWKWebViewJavascriptBridge(function(bridge) {
        bridge.callHandler('setTitle',{title: 'qiudashai'},function(response) {
            console.error('手动设置Title');
            console.error(response);
        });
    });
}

