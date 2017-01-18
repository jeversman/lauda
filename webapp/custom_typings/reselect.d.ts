export type Selector<S, P, R> = (state: S, props: P) => R;

type StateSelector<S, R> = (state: S) => R;

export function createSelector<S, R, T>(
  selector: StateSelector<S, R>,
  combiner: (res: R) => T,
): StateSelector<S, T>;
export function createSelector<S, P, R, T>(
  selector: Selector<S, P, R>,
  combiner: (res: R) => T,
): Selector<S, P, T>;

export function createSelector<S, R1, R2, T>(
  selector1: StateSelector<S, R1>,
  selector2: StateSelector<S, R2>,
  combiner: (res1: R1, res2: R2) => T,
): StateSelector<S, T>;
export function createSelector<S, P, R1, R2, T>(
  selector1: StateSelector<S, R1> | Selector<S, P, R1>,
  selector2: StateSelector<S, R2> | Selector<S, P, R2>,
  combiner: (res1: R1, res2: R2) => T,
): Selector<S, P, T>;

export function createSelector<S, R1, R2, R3, T>(
  selector1: StateSelector<S, R1>,
  selector2: StateSelector<S, R2>,
  selector3: StateSelector<S, R3>,
  combiner: (res1: R1, res2: R2, res3: R3) => T,
): StateSelector<S, T>;
export function createSelector<S, P, R1, R2, R3, T>(
  selector1: StateSelector<S, R1> | Selector<S, P, R1>,
  selector2: StateSelector<S, R2> | Selector<S, P, R2>,
  selector3: StateSelector<S, R3> | Selector<S, P, R3>,
  combiner: (res1: R1, res2: R2, res3: R3) => T,
): Selector<S, P, T>;

export function createSelector<S, R1, R2, R3, R4, T>(
  selector1: StateSelector<S, R1>,
  selector2: StateSelector<S, R2>,
  selector3: StateSelector<S, R3>,
  selector4: StateSelector<S, R4>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4) => T,
): StateSelector<S, T>;
export function createSelector<S, P, R1, R2, R3, R4, T>(
  selector1: StateSelector<S, R1> | Selector<S, P, R1>,
  selector2: StateSelector<S, R2> | Selector<S, P, R2>,
  selector3: StateSelector<S, R3> | Selector<S, P, R3>,
  selector4: StateSelector<S, R4> | Selector<S, P, R4>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4) => T,
): Selector<S, P, T>;

export function createSelector<S, R1, R2, R3, R4, R5, T>(
  selector1: StateSelector<S, R1>,
  selector2: StateSelector<S, R2>,
  selector3: StateSelector<S, R3>,
  selector4: StateSelector<S, R4>,
  selector5: StateSelector<S, R5>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5) => T,
): StateSelector<S, T>;
export function createSelector<S, P, R1, R2, R3, R4, R5, T>(
  selector1: StateSelector<S, R1> | Selector<S, P, R1>,
  selector2: StateSelector<S, R2> | Selector<S, P, R2>,
  selector3: StateSelector<S, R3> | Selector<S, P, R3>,
  selector4: StateSelector<S, R4> | Selector<S, P, R4>,
  selector5: StateSelector<S, R5> | Selector<S, P, R5>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5) => T,
): Selector<S, P, T>;

export function createSelector<S, R1, R2, R3, R4, R5, R6, T>(
  selector1: StateSelector<S, R1>,
  selector2: StateSelector<S, R2>,
  selector3: StateSelector<S, R3>,
  selector4: StateSelector<S, R4>,
  selector5: StateSelector<S, R5>,
  selector6: StateSelector<S, R6>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6) => T,
): StateSelector<S, T>;
export function createSelector<S, P, R1, R2, R3, R4, R5, R6, T>(
  selector1: StateSelector<S, R1> | Selector<S, P, R1>,
  selector2: StateSelector<S, R2> | Selector<S, P, R2>,
  selector3: StateSelector<S, R3> | Selector<S, P, R3>,
  selector4: StateSelector<S, R4> | Selector<S, P, R4>,
  selector5: StateSelector<S, R5> | Selector<S, P, R5>,
  selector6: StateSelector<S, R6> | Selector<S, P, R6>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6) => T,
): Selector<S, P, T>;


export type Memoizer = <F extends Function>(f: F, ...args: any[]) => F;

type EqualityChecker = <T>(a: T, b: T) => boolean;

export const defaultMemoize:
  <F extends Function>(f: F, equalityCheck?: EqualityChecker) => F;

export function createSelectorCreator(
  memoize: Memoizer, ...options: any[]
): typeof createSelector;
