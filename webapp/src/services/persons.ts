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