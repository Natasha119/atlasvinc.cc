const fs = require("fs");

function readStream(req, res, path)
{
    const file = fs.createReadStream(__dirname + path, {highWaterMark:1024});

    file.on("error", function onError(error)
    {
        res.write(error.message);
        res.end();
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

function serveFile(req, res, path)
{
    fs.stat(__dirname + req.url, function stat(error, stats){
        
        if(error != null && error.code == "ENOENT")
        {
            res.write(error.message);
            res.end();
        }
        else
        if(stats.isDirectory())
        {
            readStream(req, res, path + "/index.html");
        }
        else
        {
            readStream(req, res, path);
        }
    }); 
};

module.exports = serveFile;