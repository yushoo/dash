import React, {useState} from 'react';
import { Link } from 'react-router-dom'

//style
import './Join.css';

const Join = () => {
    //hooks declared in function based components
    //pass in initial value of '' in useState
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    return (
        <div className = "joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join</h1>
                <div><input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} /></div>
                <div><input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} /></div>
                {/* sending strings through url 
                    pass parameters through questions mark */}
                <Link onClick={event => (!name || !room) ? event.preventDefault() : null } to={`/chat?name=${name}&room=${room}`}>
                    <button className="button mt-20" type="submit">Sign In</button>
                </Link>
            </div>
        </div>
    )
}

export default Join; 