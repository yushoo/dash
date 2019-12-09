# Introduction
Socket.IO is a WebSocket API that will use feature detection to decide if the connection will be established with WebSocket, AJAX long polling, Flash, etc to make creating realtime apps that work everywhere in a snap. 

Socket.IO is not a WebSocket implementation because it will decide other means of connections if appropriate. 

# Installing
```
npm install --save socket.io
```

### Client Side js
```
npm install --save socket.io-client
```

# Client and Server Side Example 
This example is done with react.js
#### Server (app.js)
```
var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(80);

function handler (req, res) {
fs.readFile(__dirname + '/index.html',
function (err, data) {
    if (err) {
    res.writeHead(500);
    return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
});
}

io.on('connection', function (socket) {
socket.emit('news', { hello: 'world' });
socket.on('my other event', function (data) {
    console.log(data);
});
});
```

#### Client (index.html)
```
<script src="/socket.io/socket.io.js"></script>
<script>
var socket = io('http://localhost');
socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
});
</script>
```

## Using with Express (What I use to create my routes)
#### Server (app.js)
```
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(80);
// WARNING: app.listen(80) will NOT work here!

app.get('/', function (req, res) {
res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
socket.emit('news', { hello: 'world' });
socket.on('my other event', function (data) {
    console.log(data);
});
});
```

#### Client (index.html)
```
<script src="/socket.io/socket.io.js"></script>
<script>
  var socket = io.connect('http://localhost');
  socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
  });
</script>
```