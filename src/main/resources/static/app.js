var stompClient = null;

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    } else {
        $("#conversation").hide()
    }
}

function connect() {
    var socket = new SockJS("/websocket-demo");
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/greetings', function (greeting) {
            showGreeting(JSON.parse(greeting.body).content);
        });
    });
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected!");
}

function sendName() {
    stompClient.send("/app/hello", {}, JSON.stringify({'name' : $("#name").val()}));
}
$(function () {
   $("form").on('submit', function (e) {
       e.preventDefault()
   });
   $( "#connect" ).click(function() { connect(); });
   $( "#disconnect" ).click(function() { disconnect(); });
   $( "#send" ).click(function() { sendName(); });
});