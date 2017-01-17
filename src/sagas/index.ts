import connectionSaga from './connection';
import pgenSaga from './pgen';

export default function* rootSaga() {
    yield [
        connectionSaga(),
        pgenSaga(),
    ];
}
