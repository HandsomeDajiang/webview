function getToken(){
    window.top.postMessage(
        'message123',
        'https://handsomedajiang.github.io',
    );
}
function getToken1(){
    // setupWKWebViewJavascriptBridge(function(bridge) {
    //     bridge.callHandler('getMiniProgramToken',{},function(response) {
    //        console.log(response);
    //     });
    // });
    window.top.postMessage(
        'message789797',
        '*',
    );
}

// window.onmessage = handelMessage;
// function handelMessage(e){
//     console.error(e.origin)
//     alert(e.origin.toString())
// }
