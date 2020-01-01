# dash
An anonymous chat app built with node.js, socket.io, express, and react.js

## The Goal
My goal with this project is to learn how to use socket.io and reinforce my skills in react.js while also implementing a chat app.

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

# Overview of Dash
- Two directories: Client and Server
- The socket creates a connection between users in a chat room. The chat messages are stored in each users browser. If a user were to leave, all the chat information would disappear. 
- Server Directory:
    - index.js 
        - Dependencies: express, socket.io, cors
        - Deconstruct helper methods from './users.js'
        - Tell application to use express
        - Create HTTP server object
        - initialize socketio on server object and listen on process.env.PORT or 5000 for local development.
        - socket methods
            - when client emits 'connect' await the following messages
                - 'join' - (objects: name, room) -> add user with addUser helper method. Connect the user to the room with socket.join(room id). Emit a message to the user a welcome message. Broadcast to all users in the room that a new user has joined the chat room.
                - 'sendMessage' - message -> use socket.id to get user information. Send to room user name and text message. The client side has a socket listener for 'message.'
                - 'disconnect' - -> remove user from chat and emit a message to the room that said user has left. Update the users in room information.
    - router.js
        - Usually I would create routes instead of using links in the front end, which is why the only route is the landing page. This was the case because it was easier to send info via url than to send a json object. 
    - users.js
        - contains all the helper methods used in index.js 
        - addUser: 
            - Method to add user to a chat room
            - takes in id, name, room sent via client
            - checks if existing user in chatroom
            - creat user const and push to users array
            - returns user
        - removeUser:
            - Method to remove a user from a chat room 
            - takes in id via client
            - checks if user exists. If user does exist then remove from users array.
        - getUser: 
            - Method is used in chat when a user posts a message so that everyon in the room can associate messages to the right user. 
            - takes in id via client
            - returns user based on specific id
        - getUsersInRoom:
            - Method is used to relay to all users in a room when a user has left or join their chat room.  
            - takes in room via client
            - returns an array of all users in a room
- Client Directory:
    - index.js
        - When the running npm build, the build file will look for this file. This file will inject react application into single div called root. The div will contain App, which is the root component of dash. 
    - App.js
        - Functional component that renders the Router component.
        - The router component renders components based on certain routes. The routes being '/' and '/chat.'
    - Components:
        - Chat
            - This component is the ui for user messenging.
            - Contains five state hooks: name, room, users, message, messages. Name and room are set by the props accessed via url given by the location prop from the join component.
                ```javascript
                    const { name, room } = queryString.parse(location.search);
                ```
            - set socket endpoint to my server deployed on heroku. I can use the server for all my real time chat applications. 
            - separate useEffect methods because it is not good to have the methods called whenever an action from the user is done. Only run useEffect for messages when messages has been changed. For the the initializing of the chat room only call functions relevant to that purpose, so the useEffect, working as a lifecycle method, will set up the room and user name and emit to the server that a user has joined.
            - returns the associated components for the chatroom.
        - InfoBar
            - This component is used to display that status of the user ie online or offline.
            - Takes in the the room prop from chat component. 
            - Image link to leave the chat and go back to the root landing page.
        - Input
            - Stores the user input.
            - Event handler for when a button is clicked that calls the sendMessage method (passed in from chat component).
        - Join
            - This is the root destination of dash. 
            - contains two state hooks: name and room
            - name and room needs text in order for the onClick to work. The link stores the user inputted information in the url. 
                ```javascript
                    `/chat?name=${name}&room=${room}`
                ``` 
            - functional component that returns a div that takes in user input for name and room name.   
        - Messages
            - This component displays on the messages that have been sent in a chat room. 
            - Uses ScrollToBottom to make it easier for user to stay updated with new messages. 
            - Maps through all the messages when this component is rendered.
            ```javascript
                 <ScrollToBottom className="messages">
                    {messages.map((message, i) => <div key={i}><Message message={message} name={name}/></div>)}
                </ScrollToBottom>
            ```
