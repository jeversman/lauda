import {SagaIterator, Pattern, CANCEL, delay} from "redux-saga";
import {
  put, call, cancelled, fork, take, cancel, race, select,
} from "redux-saga/effects";
import "requestidlecallback";
import {Action} from "redux";
import {AsyncActionCreators} from "redux-typescript-actions";

import setFunctionName from "utils/setFunctionName";


export function bindAsyncAction<P, R, C>(
  actionCreator: AsyncActionCreators<P, R, any>,
  worker: (params: P, context?: C) => Promise<R> | SagaIterator
): (params: P, context?: C) => SagaIterator {
  function* boundAsyncActionSaga(params: P, context?: C): SagaIterator {
    yield put(actionCreator.started(params));

    console.log('BIND ASYNC ACTION STARTED');

    let result: R;
    let isCancelled = false;

    try {
      result = yield call(worker, params, context);
    } catch (error) {
      yield put(actionCreator.failed({params, error}));
      throw error;
    } finally {
      if (yield cancelled()) {
        isCancelled = true;
        yield put(actionCreator.failed({params, error: 'cancelled'}));
      }
    }

    if (!isCancelled)
      yield put(actionCreator.done({params, result}));

    console.log('BIND ASYNC ACTION DONE');
    console.log(result);

    return result;
  }

  const capName = worker.name.charAt(0).toUpperCase() +
                  worker.name.substring(1);

  return setFunctionName(
    boundAsyncActionSaga,
    `bound${capName}(${actionCreator.type})`
  );
}


/**
 * Format error caught inside saga to display saga stack.
 */
export function formatError(e: Error) {
  return `${e}\n${e['sagaStack']}`;
}


/**
 * Creates saga that starts passed saga and restarts it on every matching
 * action.
 */
export function restartOn(pattern: Pattern<Action>) {
  return function decorator(saga: () => SagaIterator) {
    function* restartingSaga(): SagaIterator {
      let task = yield fork(saga);

      while (true) {
        yield take(pattern);

        yield cancel(task);

        task = yield fork(saga);
      }
    }

    return setFunctionName(restartingSaga, `restarting(${saga.name})`);
  };
}


/**
 * Return promise that never resolves.
 */
export function waitForever(): Promise<void> {
  return new Promise<void>(() => {});
}


/**
 * Returns promise that resolves once browser becomes idle.
 */
export function waitForIdle(): Promise<Deadline> {
  let idleCallbackId;

  const promise = new Promise(resolve => {
    idleCallbackId = requestIdleCallback(resolve);
  });

  promise[CANCEL] = () => {
    cancelIdleCallback(idleCallbackId);
  };

  return promise;
}


function* batchCollector<T>(pattern: Pattern<T>, batch: T[]): SagaIterator {
  while (true) {
    batch.push(yield take(pattern));
  }
}

/**
 * Batches actions that are dispatched within given time interval (ms) and
 * runs `watcher` on this batch.
 */
export function* batchActions<T>(
  pattern: Pattern<T>, interval: number, worker: (batch: T[]) => SagaIterator
): SagaIterator {
  let batch: T[];

  while (true) {
    batch = [yield take(pattern)];

    yield race({
      delay: call(delay, interval),
      collect: call(batchCollector, pattern, batch),
    });

    yield fork(worker, batch);
  }
}

/**
 * Invokes `worker` once selected state changes.
 */
export function* listenState<T>(
  selector: (state: any) => T,
  worker: (values: T, prevValues: T) => any,
): SagaIterator {
  let prevValues: T = undefined;

  while (true) {
    yield take('*');

    const values = yield select(selector);

    if (values !== prevValues)
      yield fork(worker, values, prevValues);

    prevValues = values;
  }
}

export function* startInterval(worker: () => any,
                               timeout: number): SagaIterator {
  while (true) {
    yield call(delay, timeout);
    yield fork(worker);
  }
}
