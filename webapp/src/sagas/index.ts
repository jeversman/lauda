import {fork} from 'redux-saga/effects';

import personsSaga from './persons';

export default function* rootSaga() {
    yield fork(personsSaga);
}
