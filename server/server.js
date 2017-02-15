var socketIO = require('socket.io');
var jsonfile = require('jsonfile');

var testDataPath = './data.json';
var nbaPlayersPath = './nbaPlayers.json';
var grlsPath = './grls.json';

var PATH = grlsPath;





var persons = [];

main();
function main() {
    startServer();
    // test();
}

function startServer() {
    
    loadPersons();
    
    console.log('Hello from server');
    const io = socketIO(8090);

    io.on('connection', (socket) => {
        console.log('Connection received, send answer');
        socket.emit('hello');
        subscribe(socket);
    });
}

function loadPersons() {
    jsonfile.readFile(PATH, (err, obj) => {
        if (err) {
            jsonfile.writeFile(PATH, {persons: []}, (err) => {
                if (err) {
                    console.log('save failed', err);
                }
                loadPersons();
            });
        }
        else {
            persons = obj.persons;
        }
    });
}

function savePersons() {
    var objectToSave = {persons: persons};
    
    jsonfile.writeFile(PATH, objectToSave, (err) => {
        if (err) {
            console.log('save failed', err);
        }
    });
}

function subscribe(socket) {
    socket.on('getPersons', () => {
        sendPersons(socket);
    });

    socket.on('createPerson', (person) => {
        addPerson(person);
    });

    socket.on('deletePerson', (personName) => {
        deletePerson(personName);
});
}

function addPerson(person) {
    deletePerson(person.name);
    persons.push(person);
    savePersons();
}

function deletePerson(personName) {
    persons = persons.filter(function (person) {
        return person.name !== personName;
    });
    savePersons();
}

function sendPersons(socket) {
    socket.emit('persons', persons);
}

function test() {
    getPersons();
}