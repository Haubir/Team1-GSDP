var HOST = location.origin.replace(/^http/, 'ws')
var ws = new WebSocket(HOST);
var el = document.getElementById('server-time');

ws.onopen = () => {
    // Connection is opened and ready to use
    ws.send('GUI client');
    // Insert following into robot client file:
    // ws.send('Robot');
};

ws.onmessage = message => {
    // Handle incoming messages from the server
    el.innerHTML = 'Server time: ' + message.data + ', as the Great Medes spawns upon new targets';
};