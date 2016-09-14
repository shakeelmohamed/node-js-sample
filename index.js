var express = require("express");
var bunyan = require("bunyan");
var splunkBunyan = require("splunk-bunyan-logger");

// Setup the web app
var app = express();
app.set("port", (process.env.PORT || 3000));
app.use(express.static(__dirname + "/public"));

// Create the logger
var splunkStream = splunkBunyan.createStream({
    "url": "https://localhost:8088",
    "token": ""
});

var Logger = bunyan.createLogger({
    name: "Splunk Workshop logger",
    streams: [
        splunkStream
    ]
});

app.get("/", function(request, response) {
    response.send("Hello World! - Node.js demo");

    // Log headers used by the client
    Logger.info({
       headers: request.headers
    }, "Client headers");
});

app.listen(app.get("port"), function() {
    // log the port we're using
    Logger.info("Node.js app is running on port " + app.get("port"));

    // Generate a log message every 1s
    var count = 0;
    setInterval(function() {
        count++;
        Logger.info("Interval has run " + count + " times");
    }, 1000);
});
