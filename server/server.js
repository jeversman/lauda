var socketIO = require('socket.io');
var jsonfile = require('jsonfile');

main();
function main() {
    startServer();
    // test();
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
    socket.on('getPersons', () => {
        sendPersons(socket);
    });
}

function sendPersons(socket) {
    jsonfile.readFile('./data.json', (err, obj) => {
        console.log('Server sends persons');
        console.log(obj.persons);
        socket.emit('persons', obj.persons);
    });
}

// function getPersons(cb) {
//     var persons = [];
//     jsonfile.readFile('./data.json', (err, obj) => {
//         console.log(obj.persons);
//         // persons = obj.persons;
//     });
// }

function test() {
    getPersons();
}