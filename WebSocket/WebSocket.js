const http = require('http');
import WebSocket, {WebSocketServer} from 'ws';

const wss = new WebSocketServer({
    port: 5000,
}, () => {
    console.log("server start on 5000")
})

wss.on('connection', function connection(ws) {
    ws.send("connect user")
})
