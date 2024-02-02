const http = require("https");
const fs = require("fs");
const stream = require("stream");
const serveFile  = require("./serveFile.js");
const ws = require("ws");

const HTTPSServerOptions = {
    key: fs.readFileSync("/etc/letsencrypt/live/natasha119.com/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/natasha119.com/fullchain.pem")
};

const server = http.createServer(HTTPSServerOptions);

const wsserver = new ws.WebSocketServer({server: server, clientTracking: true});

const ReplaceHurpDurp = new stream.Transform({
    transform(chunk, encoding, callback)
    {
        callback(null, chunk.toString().replace(/a/g, "AAAASDKJF"));
    }
});

server.on("request", function HTTPSServerRequest(req, res)
{
    serveFile(req, res, req.url);
});

wsserver.on("connection", function wssOnConnection(ws, req)
{
    ws.on("error", console.error);

    ws.on("message", function wsOnMessage(data)
    {
        let dataJSON = JSON.parse(data);

        if(dataJSON.mtype == "createMessage")
        {
            let messageJSON = {
                mtype: "messageRecieved", 
                message: req.socket.remoteAddress + ": " + dataJSON.message
            }

            wsserver.clients.forEach(socket => socket.send(JSON.stringify(messageJSON)));
        }
    });
});

server.listen(8822);