import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

let socket;

const Chat = ({ location }) => {
    //states
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'localhost:5000';

    //Runs when chat component renders
    //location comes from react-router as a prop
    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);
        
        //fyi non es6 format { name: name, room: room}
        socket.emit('join', { name, room }, ({ }) => {
            
        });

        //turn of client instance of socket
        return () => {
            socket.emit('disconnect');
            socket.off();
        }
        //if ENDPOINT and location.search changed then we call useEffect function
    }, [ENDPOINT, location.search]);

    useEffect(() => {
        //listen for message from the backend
        socket.on('message', (message) => {
            setMessages([...messages,message]);
        })
    },
    //run only when messages array has changed 
    [messages]);
    
    //function for sending messages
    const sendMessage = (event) => {
        //prevent refreshing of browser
        event.preventDefault();
        if(message) {
            socket.emit('sendMessage', message), () => setMessage('');
        }
    }

    return (
        <div className="outerContainer">
            <div className="container">
                <input 
                value={message} 
                onChange={(event) => setMessage(event.target.val)} 
                onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
                />
            </div>
        </div>
    )
}

export default Chat; 