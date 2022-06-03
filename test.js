function getToken(){
    setupWKWebViewJavascriptBridge(function(bridge) {
        const title = document.title
        bridge.callHandler('setTitle',null,function(response) {
           console.log(response);
        });
    });
}
