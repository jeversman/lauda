import {StoreEnhancer} from "redux";


export interface ReduxLocalStorageConfig<State, Subset> {
  key?: string;
  slicer?(paths: string | string[]): (state: State) => Subset;
  serialize?(subset: Subset): string;
  deserialize?(serialized: string): Subset;
  merge?(initialState: State, persistedState: Subset): State;
}


export default function persistState<State, Subset>(
  paths?: string | string[],
  config?: ReduxLocalStorageConfig<State, Subset>
): StoreEnhancer<State>;
