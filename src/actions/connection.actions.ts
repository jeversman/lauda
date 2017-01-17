import actionCreatorFactory from "redux-typescript-actions";

const actionCreator = actionCreatorFactory('sagas/connection');

export const connectionStarted =
    actionCreator('CONNECTION_STARTED', {
        description: 'Attempting connection to Glacier2 router',
    });

export const connectionEstablished =
    actionCreator('CONNECTION_ESTABLISHED', {
        description: 'Connected to Glacier2 router',
    });

export const connectionRetryScheduled =
    actionCreator<{retrySeconds: number}>('CONNECTION_RETRY_SCHEDULED', {
        description: 'Retrying connection to Glacier2 router',
    });

export const connectionClosed =
    actionCreator('CONNECTION_CLOSED');

export const connectionCloseRequested =
    actionCreator('CONNECTION_CLOSE_REQUESTED');