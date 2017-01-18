import { Component, ComponentClass, StatelessComponent } from 'react';
import { Store, Dispatch, ActionCreator } from 'redux';

export interface ClassDecorator<P, O> {
  (component: StatelessComponent<P> | ComponentClass<P>): ComponentClass<O>;
}

/**
 * Connects a React component to a Redux store.
 * @param mapStateToProps
 * @param mapDispatchToProps
 * @param mergeProps
 * @param options
 */
export function connect<O, S, D, P>(
  mapStateToProps: MapStateToProps<O, S>|MapStateToPropsFactory<O, S>,
  mapDispatchToProps: MapDispatchToProps<O, D>|MapDispatchToPropsFactory<O, D>|D,
  mergeProps: MergeProps<S, D, O, P>,
  options?: Options): ClassDecorator<P, O>;

export function connect<O, S, D>(
  mapStateToProps?: MapStateToProps<O, S>|MapStateToPropsFactory<O, S>,
  mapDispatchToProps?: MapDispatchToProps<O, D>|MapDispatchToPropsFactory<O, D>|D
): ClassDecorator<O & S & D, O>;

export interface MapStateToProps<O, S> {
  (state: any, ownProps?: O): S;
}

export type MapStateToPropsFactory<O, S> = () => MapStateToProps<O, S>;

export interface MapDispatchToProps<O, D> {
  (dispatch: Dispatch<any>, ownProps?: O): D;
}

export type MapDispatchToPropsFactory<O, D> = () => MapDispatchToProps<O, D>;

export interface MergeProps<S, D, O, P> {
  (stateProps: S, dispatchProps: D, ownProps: O): P;
}

export interface Options {
  /**
   * If true, implements shouldComponentUpdate and shallowly compares the result of mergeProps,
   * preventing unnecessary updates, assuming that the component is a “pure” component
   * and does not rely on any input or state other than its props and the selected Redux store’s state.
   * Defaults to true.
   * @default true
   */
  pure: boolean;
}

export interface Property {
  /**
   * The single Redux store in your application.
   */
  store?: Store<any>;
  children?: Function;
}

/**
 * Makes the Redux store available to the connect() calls in the component hierarchy below.
 */
export class Provider extends Component<Property, {}> { }
