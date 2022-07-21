function getToken(){
    // setupWKWebViewJavascriptBridge(function(bridge) {
    //     bridge.callHandler('getMiniProgramToken',{},function(response) {
    //        console.log(response);
    //     });
    // });
    window.top.postMessage(
        'message',
        'file://*',
    );
}

window.onmessage = handelMessage;
function handelMessage(e){
    console.error(e.origin)
    alert(e.origin.toString())
}
