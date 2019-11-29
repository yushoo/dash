const express  = require('express');
const socketio = require('socket.io');
const http = require('http');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//functions available when connection is established
io.on('connection', (socket) => {
    console.log('We have a new connection');

    //join is looked for when broadcasted in the client side
    socket.on('join', ({ name, room }, callback) => {
        //addUser returns two properties
        const { error, user } = addUser({ id: socket.id, name, room });
        
        if(error){
            return callback(error);
        } else {
            socket.emit( 'message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}` });
            socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined`});
            socket.join(user.room);
            
            //no erros at this point so callback does nothing
            callback();
        } 
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, text: message});

        callback();
    });

    socket.on('disconnect', () => {
        console.log('User has left!');
    });
});

//Route set up for '/'
app.use(router);

server.listen(PORT, () => console.log(`Server has start on ${PORT}`));