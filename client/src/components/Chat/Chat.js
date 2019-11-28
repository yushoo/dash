import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

let socket;

const Chat = ({ location }) => {
    //states
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const ENDPOINT = 'localhost:5000';

    //Runs when chat component renders
    //location comes from react-router as a prop
    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);
        
        //fyi non es6 format { name: name, room: room}
        socket.emit('join', { name, room }, ({ error }) => {
            alert(error);
        });

        //if ENDPOINT and location.search changed then we call useEffect function
    }, [ENDPOINT, location.search]);

    return (
        <h1>Chat</h1>
    )
}

export default Chat; 