//create helper functions to help us manage anything related to users

const users = [];

const addUser = ({id, name, room}) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

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

const removeUser = () => {

}

const getUser = () => {

}

const getUsersInRoom = () => {

}