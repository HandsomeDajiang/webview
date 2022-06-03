function getToken(){
    setupWKWebViewJavascriptBridge(function(bridge) {
        const title = document.title
        bridge.callHandler('getMiniProgramToken',null,function(response) {
           console.log(response);
        });
    });
}
