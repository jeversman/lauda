var socketIO = require('socket.io');

main();
function main() {
    startServer();
}

function startServer() {
    console.log('Hello from server');
    const io = socketIO(8090);

    io.on('connection', (socket) => {
        console.log('Connection received, send answer');
        socket.emit('hello');
        subscribe(socket);
    });
}

function subscribe(socket) {
    socket.on('updatePersons', (data) => {
        console.log(data);
    });
}

function updatePersons(persons) {
    
}