# dash
An anonymous chat app built with node.js, socket.io, express, and react.js

## The Goal
My goal with this project is to learn how to use feather.js and socket.io and reinforce my skills in react.js while also implementing a chat app.

## Getting Started
Change in package.json the start script 
```
"test": "echo \"Error: no test specified\" && exit 1"
```

to
```
"start": "node app"
```

### Socket.io
Used for real time data transferring.  

- Command Line with integration with express and socketio. Moment.js is a package that will aid with time in the application: 
```
npm i @feathersjs/feathers @feathersjs/express @feathersjs/socketio moment
```

## 


### Server (directory)
 
## Client (directory)
```
npm install --save react-router socket.io-client react-scroll-to-bottom react-emoji query-string
```

### React.js
```
npm init -y

npm install --save nodemon socket.io express
```
--------------------------------------------------
--------------------------------------------------
## How deos HTTP protocol work?
A request is sent via an http url address to a backend server. In response, the server sends back requested information. This connection is called a tcp connection. A new connection is made every single time a request is sent. HTTPS are unidirectional so the sender has to trigger a request and the sender will get a response from the server.

## What are WebSockets?
Web sockets are bi-directional so the sender can send data and the receiver can also send data. So for an example, when a friend send a message via a websocket, the receiver friend will receive the request from the server automatically. Bi-directionality is acheived by keeping the connection established with the first client server connection open. The connection is closed when one of the clients disconnects (varies depending on the amount of clients connected to each other).

## Where/When can WebSockets be used?
- Real Time Applications (streaming, stock analysis)
- Gaming Applications
- Chat Applications

## When NOT to use Websockets
- When real time updates are not required
- RESTful services are sufficient to get data from the server. (CRUD applications)
