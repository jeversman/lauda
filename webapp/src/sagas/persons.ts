import {SagaIterator, takeEvery} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import io from 'socket.io-client';

import {getPersonsService, createPersonService} from 'services/persons';
import {getPersons, addPersons, createPerson, } from '../actions/persons.actions';

let _socket: any = {};

export default function* personsSaga(): SagaIterator {
    yield call(createConnection);
    yield call(subscribe);
    yield call(getPersonsSaga);
    yield takeEvery(getPersons.type, getPersonsSaga);
    yield takeEvery(createPerson.type, createPersonSaga);
}

function* createPersonSaga(action) {
    console.log('CREATE PERSON SAGA');

    yield call(createPersonService, _socket, action.payload.person);
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