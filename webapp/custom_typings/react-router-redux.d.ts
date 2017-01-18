import {Reducer, Store, Middleware} from "redux";
import {LocationDescriptor, History} from "history";

export const CALL_HISTORY_METHOD: string;
export const LOCATION_CHANGE: string;

export const push: PushAction;
export const replace: ReplaceAction;
export const go: GoAction;
export const goBack: GoForwardAction;
export const goForward: GoBackAction;
export const routerActions: RouteActions;

export type PushAction = (nextLocation: LocationDescriptor) => RouterAction;
export type ReplaceAction = (nextLocation: LocationDescriptor) => RouterAction;
export type GoAction = (n: number) => RouterAction;
export type GoForwardAction = () => RouterAction;
export type GoBackAction = () => RouterAction;

export type RouterAction = {
  type: string
  payload?: any
}

export interface RouteActions {
  push: PushAction;
  replace: ReplaceAction;
  go: GoAction;
  goForward: GoForwardAction;
  goBack: GoBackAction;
}
export interface ReactRouterReduxHistory extends History {
  unsubscribe(): void;
}

export interface DefaultSelectLocationState extends Function {
  (state: any): any;
}

export interface SyncHistoryWithStoreOptions {
  selectLocationState?: DefaultSelectLocationState;
  adjustUrlOnReplay?: boolean;
}

export function routerReducer(state?: any, options?: any): Reducer<any>;
export function syncHistoryWithStore(history: History, store: Store<any>, options?: SyncHistoryWithStoreOptions): ReactRouterReduxHistory;
export function routerMiddleware(history: History): Middleware;
