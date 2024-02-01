const ws = require("ws");

const wss = new ws.WebSocketServer({ port: 8822});

wss.on("connection", function wssOnConnection(ws)
{
    console.log("Socket connected");
    
    ws.on("error", console.error);

    ws.on("message", function wssMessage(data)
    {
        console.log(`Recieved socket data: ${data}`);
    });
});

module.exports = wss;