window.onload = function(){
    this.setupWKWebViewJavascriptBridge = (callback) => {
        if (window.WKWebViewJavascriptBridge) {
            return callback(window.WKWebViewJavascriptBridge);
        }
        if (window.WKWVJBCallbacks) {
            return window.WKWVJBCallbacks.push(callback);
        }
        window.WKWVJBCallbacks = [callback];
        window.webkit.messageHandlers.iOS_Native_InjectJavascript.postMessage(null)
    }
}
