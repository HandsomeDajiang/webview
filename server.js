window.onload = function(){
    this.setupWKWebViewJavascriptBridge = (callback) => {
        if (!window.WKWebViewJavascriptBridge) { //  适配 mac 端。
            initWKWebViewJavascriptBridge(callback);
        }
        if (window.WKWebViewJavascriptBridge) {
            return callback(window.WKWebViewJavascriptBridge);
        }
    }
}
