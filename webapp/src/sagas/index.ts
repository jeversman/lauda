import {fork} from 'redux-saga/effects';

import connectionSaga from './connection';
// import personsSaga from './persons';

export default function* rootSaga() {
    yield fork(connectionSaga);
    // yield fork(personsSaga);
}
