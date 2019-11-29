//create helper functions to help us manage anything related to users

const users = [];

const addUser = ({id, name, room}) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    //check all user stored in array users if the user has the same room and username
    const existingUser = users.find((user) => user.room === room
                                            && user.name === name);
    
    //check if new user                                        
    if(existingUser){
        return {error: 'Username is taken'};
    }

    //create new user
    const user = {id, name, room};

    //push new user onto array of users
    users.push(user);

    //return new user so we know who the new user is
    return { user };
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    //remove user if found in users array
    if(index !== -1){
        return users.splice(index, 1)[0];
    }
}

//get specific user based on unique id
const getUser = (id) => {
    return users.find((user) => user.id === id);
}

//get all users from specific room
const getUsersInRoom = (room) => {
    //return an array of all users in a room
    return users.filter((user) => user.room === room);
}

module.exports = {addUser, removeUser, getUser, getUsersInRoom};