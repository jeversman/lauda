import {SagaIterator, delay, Task} from "redux-saga";
import {call, put, take, race, fork, cancel} from "redux-saga/effects";
import {Ice} from 'ice';

// import {retryConnectionClicked} from "components/ConnectionBar.actions";
import {
    createCommunicator, setupRouterConnection, destroyCommunicator,
} from "services/ice";
import {wrapIcePromise} from "utils/ice";
import {formatError} from "utils/sagas";

import {
    connectionStarted, connectionEstablished,
    connectionClosed, connectionRetryScheduled, connectionCloseRequested,
} from "../actions/connection.actions";

export function waitForConnectionClose(connection: Ice.Connection) {
    return wrapIcePromise(connection.waitUntilFinished());
}

function getRetrySeconds(attempt: number): number {
    if (attempt <= 0) {
        return 5;
    } else if (attempt === 1) {
        return 15;
    } else if (attempt === 2) {
        return 30;
    } else {
        return 60;
    }
}

function closeConnection(connection: Ice.Connection) {
    return wrapIcePromise(connection.close());
}

function* connectionCloseRequestWorker(connection: Ice.Connection):
SagaIterator {
    yield take(connectionCloseRequested.type);

    try {
        yield call(closeConnection, connection);
    } catch (e) {
        console.warn("Failed to close connection:", formatError(e));
    }
}

export default function* connectionSaga(): SagaIterator {
    let attempt = -1;

    while (true) {
        attempt += 1;

        yield put(connectionStarted());

        yield call(createCommunicator);

        let connectionCloseTask: Task = null;

        let closedByError = false;

        try {
            const connection: Ice.Connection = yield call(setupRouterConnection);

            connectionCloseTask =
                yield fork(connectionCloseRequestWorker, connection);

            attempt = 0;

            if (connection.isActiveOrHolding()) {
                yield put(connectionEstablished());
            }

            yield call(waitForConnectionClose, connection);
        } catch (e) {
            closedByError = true;
            console.error('Error connecting to Glacier2 router', formatError(e));
        } finally {
            if (connectionCloseTask)
                yield cancel(connectionCloseTask);

            yield call(destroyCommunicator);
            yield put(connectionClosed());
        }

        if (!closedByError)
            continue;

        const retrySeconds = getRetrySeconds(attempt);
        yield put(connectionRetryScheduled({retrySeconds}));

        yield race({
            delay: call(delay, retrySeconds * 1000),
            // manual: take(retryConnectionClicked.type),
        });
    }
}