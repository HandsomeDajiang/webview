function getToken(){
    setupWKWebViewJavascriptBridge(function(bridge) {
        bridge.callHandler('getMiniProgramToken',{},function(response) {
            console.error('getMiniProgramToken');
            console.error(response);
        });
        bridge.callHandler('setTitle',{title: 'yyy'},function(response) {
            console.error('setTitle');
            console.error(response);
        });
    });
}

function getToken2() {
    setupWKWebViewJavascriptBridge(function(bridge) {
        bridge.callHandler('getMiniProgramToken',{},function(response) {
            console.error('getMiniProgramToken');
            console.error(response);
        });
    });
    setupWKWebViewJavascriptBridge(function(bridge) {
        bridge.callHandler('setTitle',{title: 'yyy'},function(response) {
            console.error('setTitle');
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

