// TODO Work with socket in this file!
export function getPersonsService(_socket) {
    let promise = new Promise((resolve, reject) => {
        _socket.on('persons', (persons) => {
            resolve(persons);
        });
    });
    _socket.emit('getPersons');
    return promise;
}

export function createPersonService(_socket, person) {
    _socket.emit('createPerson', person);
}

export function deletePersonService(_socket, personName) {
    _socket.emit('deletePerson', personName);
}