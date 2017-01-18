import {Reducer} from 'redux';

export type ReducerWithDependencies<S, D extends Object> =
  (state: S, action: any, dependencies: D) => S;

export function createReducer<S>(reducer: Reducer<S>): Reducer<S>;

export function createReducer<S, D extends Object>(
  dependencies: {
    [key: string]: Reducer<any>;
  },
  reducer: ReducerWithDependencies<S, D>
): Reducer<{value: S, __dependencies: D}>;

