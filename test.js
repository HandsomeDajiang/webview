function getToken(){
    // setupWKWebViewJavascriptBridge(function(bridge) {
    //     bridge.callHandler('getMiniProgramToken',{},function(response) {
    //        console.log(response);
    //     });
    // });
    window.top.postMessage(
        'message',
        '*',
    );
}
