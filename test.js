
function setTitle(){
    setupWKWebViewJavascriptBridge(function(bridge) {
        const title = document.title
        const params = {title}
        bridge.callHandler('setTitle', params, function(response) {

        });
    });
}
