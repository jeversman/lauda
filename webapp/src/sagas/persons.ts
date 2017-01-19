import {SagaIterator, takeEvery} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import io from 'socket.io-client';

import {getPersonsService} from 'services/persons';
import {getPersons, addPersons} from '../actions/persons.actions';

let _socket: any = {};

export default function* personsSaga(): SagaIterator {
    yield call(createConnection);
    yield call(subscribe);
    yield call(getPersonsSaga);
    yield takeEvery(getPersons.type, getPersonsSaga);
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

// import {connectionEstablished} from '../actions/connection.actions';
//
// import {deleteNeedlessParameters} from '../utils/profiles';
//

//
// export function* getProfiles(): any {
//     const pgen: PGen.ProfileDBPrx = yield call(getPGen);
//     let profiles = yield call(pgen.profiles);
//
//     for (let key in profiles) {
//         profiles[key].data = deleteNeedlessParameters(['__address'], profiles[key].data);
//     }
//
//     yield put(addProfiles({profiles}));
// }
//
// export function* createProfileSaga(action): any {
//     let profileData = new PGen.ProfileData();
//
//     for (let key in action.payload.profile) {
//         profileData[key] = action.payload.profile[key];
//     }
//
//     const pgen: PGen.ProfileDBPrx = yield call(getPGen);
//     yield call(pgen.set, action.payload.profile.name, profileData);
//     yield call(getProfiles);
// }
//
// export function* deleteProfileSaga(action): any {
//     const pgen: PGen.ProfileDBPrx = yield call(getPGen);
//     yield call(pgen.remove, action.payload.profileName);
//     yield call(getProfiles);
// }
//

// function send(socket) {
//     console.log('Send update msg');
//     socket.emit('updatePersons', data);
// }