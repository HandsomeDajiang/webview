function getToken(){
    setupWKWebViewJavascriptBridge(function(bridge) {
        bridge.callHandler('getMiniProgramToken',{},function(response) {
            console.error('手动获取token');
            console.error(response);
        });
    });
    setupWKWebViewJavascriptBridge(function(bridge) {
        bridge.callHandler('removeMiniProgramToken',{},function(response) {
            console.error('手动移除token');
            console.error(response);
        });
    });
    setupWKWebViewJavascriptBridge(function(bridge) {
        bridge.callHandler('setTitle',{},function(response) {
            console.error('手动设置Title');
            console.error(response);
        });
    });
    setupWKWebViewJavascriptBridge(function(bridge) {
        bridge.callHandler('closePage',{},function(response) {
            console.error('手动关闭窗口');
            console.error(response);
        });
    });
}
