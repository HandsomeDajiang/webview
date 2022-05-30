function getToken() {
    const img = document.createElement('img')
    img.src = 'http://127.0.0.1:8082/aaa'
    document.body.appendChild(img)
}


window.onload = function(){
    const socket = new WebSocket("ws://localhost:9999");

    socket.onopen = () => {
        socket.send("Hello! i am aaa");
    };

    socket.onmessage = (data) => {
        console.log(data);
    };
}

window.onmessage = handelMessage;

function handelMessage(e){
    console.error(e);
}
