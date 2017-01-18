type Deadline = {didTimeout: boolean, timeRemaining(): number};
type IdleCallback = (deadline: Deadline) => void;
type IdleOptions = {timeout: number};

declare function requestIdleCallback(callback: IdleCallback,
                                     options?: IdleOptions): number;

declare function cancelIdleCallback(id: number): void;
