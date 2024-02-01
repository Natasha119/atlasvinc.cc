var fs = require("fs");

function serveFile(req, res, path)
{
    var file = fs.createReadStream(__dirname + path, {highWaterMark:1023});

    file.on("error", function onError(err){
        if (err.message.substring(-1,6) == "ENOENT")
        {
            res.writeHead(404);
            res.end();
        }
        else
        {
            res.writeHead(err.message);
        }
    });

    file.on("data", function onData(chunk)
    {
        res.write(chunk);
    });

    file.on("end", function endOnFileEnd()
    {
        res.end();
    });
};

module.exports = serveFile;