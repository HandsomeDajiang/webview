(function (){
    'use strict';

    let token;
    window.addEventListener('message',function(e){
        console.log("receive data：" + e.data.toString());
        alert("receive data：" + e.data.toString());
        token = e.data.toString();
    });
    window.getToken = async () => {
        await window.top.postMessage(
            {
                msg:'get token',
                type: 2
            },
            "file://*"
        );
        return token;
    }
    window.closeWindow = () =>  {
        const xxx =  window.getToken();
        console.error("############");
        console.error(xxx);
        window.top.postMessage(
            {
                msg:'close webview',
                type: 1
            },
            "file://*"
        );
    }

    window.removeToken = () => {
        window.top.postMessage(
            {
                msg:'remove token',
                type: 3
            },
            "file://*"
        );
    }
})();
