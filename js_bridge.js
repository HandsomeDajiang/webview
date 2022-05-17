(function (){
    'use strict';
    window.addEventListener('message',function(e){
        console.log("receive data：" + e.data.toString());
        alert("receive data：" + e.data.toString());
    })
})();
window.closeWindow = () =>  {
    window.top.postMessage(
        {
            msg:'close webview',
            type: 1
        },
        "*"
    );
}
window.getToken = () => {
    window.top.postMessage(
        {
            msg:'get token',
            type: 2
        },
        "*"
    );
}
window.removeToken = () => {
    window.top.postMessage(
        {
            msg:'remove token',
            type: 3
        },
        "*"
    );
}