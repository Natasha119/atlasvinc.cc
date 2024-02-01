const http = require("https");
const fs = require("fs");
const stream = require("stream");
const  serveFile  = require("./serveFile.js");

const HTTPSServerOptions = {
    key: fs.readFileSync("/etc/letsencrypt/live/natasha119.com/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/natasha119.com/fullchain.pem")
};

const server = http.createServer(HTTPSServerOptions);

const ReplaceHurpDurp = new stream.Transform({
    transform(chunk, encoding, callback)
    {
        callback(null, chunk.toString().replace(/a/g, "AAAASDKJF"));
    }
});

server.on("request", function HTTPSServerRequest(req, res)
{
    if (req.url.match(/^\/chatapi\/newmessage/))
    {
        res.writeHead(200, "Chat API in active development uwu");
        return res.end();
    }
    serveFile(req, res, req.url);
});

server.listen(8822);