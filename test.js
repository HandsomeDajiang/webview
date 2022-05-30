function getToken() {
    const img = document.createElement('img')
    img.src = 'http://127.0.0.1:8082/aaa'
    document.body.appendChild(img)
}


window.onload = function(){

}

window.onmessage = handelMessage;

function handelMessage(e){
    console.error(e);
}
