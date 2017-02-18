import {SagaIterator, takeEvery} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import io from 'socket.io-client';

import {getPersonsService, createPersonService, deletePersonService, updateAllPersonsService} from 'services/persons';
import {getPersons, addPersons, createPerson, deletePerson, updateAllPersons, } from '../actions/persons.actions';
import {compute} from 'utils/persons.ts';

let _socket: any = {};

export default function* personsSaga(): SagaIterator {
    yield call(createConnection);
    yield call(subscribe);
    yield call(getPersonsSaga);
    yield takeEvery(getPersons.type, getPersonsSaga);
    yield takeEvery(createPerson.type, createPersonSaga);
    yield takeEvery(deletePerson.type, deletePersonSaga);
    yield takeEvery(updateAllPersons.type, updateAllPersonsSaga);
}

function* updateAllPersonsSaga(action) {
    console.log('UPDATE ALL PERSONS SAGA');

    let persons = action.payload.persons;

    persons.forEach((person) => {
        person = compute(person);
    });

    yield call(updateAllPersonsService, _socket, persons);
    yield call(getPersonsSaga);
}

function* deletePersonSaga(action) {
    console.log('DELETE PERSON SAGA');
    yield call(deletePersonService, _socket, action.payload.personName);
    yield call(getPersonsSaga);
}

function* createPersonSaga(action) {
    console.log('CREATE PERSON SAGA');

    let person = {};
    person['name'] = action.payload.person.name;
    let personData = {};
    for (let key in action.payload.person) {
        if (key !== 'name') {
            personData[key] = action.payload.person[key];
        }
    }
    person['data'] = personData;

    person = compute(person);

    yield call(createPersonService, _socket, person);
    yield call(getPersonsSaga);
}

function* getPersonsSaga() {
    console.log('GET PERSONS SAGA');

    let persons = yield call(getPersonsService, _socket);
    yield put(addPersons({persons}));
}

function createConnection() {
    console.log('CREATE CONNECTION');
    _socket = io(`${location.protocol}//${location.hostname}:8090`);
}

function subscribe() {
    _socket.on('hello', () => {
        console.log('Hello received from server, great!');
    });
}
