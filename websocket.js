/**
 * Created by Administrator on 2017/5/26.
 */

var websocket = null;
var url = null;

//接收到消息的回调方法

function getMessage( message) {
    websocket.onmessage = function (event) {
        var data = JSON.parse(event.data);
        message(data);
    };
}


//监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
window.onbeforeunload = function () {
    closeWebSocket();
};

//将消息显示在网页上
function setMessageInnerHTML(innerHTML) {
    console.log(innerHTML)
}

//关闭WebSocket连接
function closeWebSocket() {
    websocket.close();
}

//发送消息
function send(message) {
    websocket.send(JSON.stringify(message));
}


function clientStart(local) {
    url = local;
    websocket = new ReconnectingWebSocket(url);


//连接发生错误的回调方法
    websocket.onerror = function () {
        setMessageInnerHTML("WebSocket连接发生错误");
    };

//连接成功建立的回调方法
    websocket.onopen = function () {
        setMessageInnerHTML("WebSocket连接成功");
    };


//连接关闭的回调方法
    websocket.onclose = function () {
        setMessageInnerHTML("WebSocket连接关闭");
    };

}
