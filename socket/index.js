const io = require('socket.io')(8900, {
    cors: {
        origin : 'http://localhost:3000'
    }
});

let users = [];

const addUser = (userId, socketId) => {
    !users.some(user => user.userId === userId) && users.push({ userId, socketId });
}

const getUser = (userId) =>
{
    const selected =  users.find(user =>  user.userId === userId)
    console.log(selected);
    return selected
}

const removeUser = (socketId) =>
{
    users = users.filter(user => user.socketId !== socketId);
}



io.on('connection', (socket) =>
{
    console.log(`user with a socket id : ` + socket.id);
    
    //after every conn take userId and socketId
    socket.on('addUser', (userId) =>
    {
        addUser(userId, socket.id);
        io.emit('getUsers', users);
    })

    //send and receive message
    socket.on('sendMessage', ({ senderId, receiverId, text }) =>
    {
        const user = getUser(receiverId);
        io.to(user.socketId).emit('getMessage', {
            senderId,
            text
        })
    })

    //after disconnect we also need to clean up the socket
    socket.on('disconnect', () =>
    {
        console.log('a user disconnected')
        removeUser(socket.id);
        io.emit('getUsers', users);
    })
})


