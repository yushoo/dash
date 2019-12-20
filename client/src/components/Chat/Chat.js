import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

// import TextContainer from '../TextContainer/TextContainer';
// import Messages from '../Messages/Messages';
// import InfoBar from '../InfoBar/InfoBar';
// import Input from '../Input/Input';

import './Chat.css';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  //string of curr message
  const [message, setMessage] = useState('');
  //array of all messages of chat instance
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'localhost:5000';

  //to connect to join component
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name)

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  //to handle messages.
  useEffect(() => {
    socket.on('message', (message) => {
      //adding message to all messages
      setMessages([...messages, message ]);
    });

    socket.on('roomData', ({ users }) => {
      setUsers(users);
    })

    //disconnect event. Server will be listening for disconnect event
    return () => {
      socket.emit('disconnect');
      socket.off();
    }
    // only run this useEffect when the messages array is changed
  }, [messages])

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  return (
    <div className="outerContainer">
      <div className="container">
        <div><p>WELCOME {name} TO {room}</p></div>
          {/* {<InfoBar room={room} /> */}
          {/* <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />  */}
          <input 
            value = {message}
            onChange = {(event) => setMessage(event.target.value)}
            onKeyPress = {event => event.key === 'Enter' ? sendMessage(event) : null}
          />
      </div>
      {/* <TextContainer users={users}/> */}
    </div>
  );
}

export default Chat;