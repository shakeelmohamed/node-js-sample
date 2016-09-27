var express = require('express')
var app = express()

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('Hello World!')
})

var count = 0;
app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
  setInterval(function(){
    count++;
    console.log("Interval has run " + count + " times!");
  }, 5000);
})
