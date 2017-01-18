import {Ice} from "ice";
import _ from "lodash";

/**
 * Turn Ice promise to normal one.
 */
export function wrapIcePromise<T>(promise: Ice.Promise<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        promise.then(result => {
            if (result instanceof Ice.Promise) {
                resolve();
            } else {
                resolve(result);
            }
        }, reject);
    });
}


/**
 * Bind all proxy methods and wrap returned promises.
 */
export function wrapIceProxy<P extends Ice.ObjectPrx>(proxy: P): P {
    const boundProxy = Object.create(proxy);

    for (let key of Object.keys(Object.getPrototypeOf(proxy))) {
        if (key.startsWith('_') || key === 'constructor')
            continue;

        const origMethod: Function = proxy[key];

        boundProxy[key] = (...args) =>
            wrapIcePromise(origMethod.apply(proxy, args));
    }

    return boundProxy;
}


export function toPlainObject<T>(iceObject: Object): T {
    const ret = {};
    let excludeKeys = [];

    if (iceObject instanceof Ice.HashMap) {
        excludeKeys = ['_table', '_initialCapacity', '_loadFactor'];
    }

    if (iceObject instanceof Ice.Object) {
        ret['iceType'] = iceObject.ice_id();
        ret['iceTypes'] = iceObject.ice_ids();
    }

    for (const key of Object.keys(iceObject)) {
        if (excludeKeys.indexOf(key) !== -1) continue;

        let value = iceObject[key];

        if (Array.isArray(value)) {
            if (value[0] instanceof Object)
                value = value.map(toPlainObject);
        } else if (value instanceof Object) {
            value = toPlainObject(value);
        }

        ret[key] = value;
    }

    return ret as T;
}


export type IceObjectConstructor<T> = {
    new(...args: any[]): T;
    ice_staticId(): string;
};


/**
 * Create instance and populate from plain object values.
 */
export function create<V, T extends V>(constructor: {new(...args: any[]): T},
                                       values: V): T {
    const instance = new constructor();
    _.merge(instance, values);
    return instance;
}


export function isInstance<T>(plainObject: Object,
                              iceClass: IceObjectConstructor<T>):
plainObject is T {
    return plainObject['iceTypes'].indexOf(iceClass.ice_staticId()) !== -1;
}


export function longToNumber(long: Ice.Long) {
    return Ice.Long.prototype.toNumber.apply(long);
}


type EnumType<T> = {
    new(name: string, value: number): T;
};


export function enumToString<T extends Ice.EnumBase>(iceEnum: EnumType<T>,
                                                     value: T): string {
    return iceEnum.prototype.toString.apply(value);
}


/**
 * before you use, think about why
 * */
export function toHashMap<I, V>(hashMapStruct: Object): Ice.HashMap<I, V> {
    const hashMap = new Ice.HashMap<I, V>();
    Ice.HashMap.prototype.forEach.call(hashMapStruct, (key, value) =>
        hashMap.set(key, value));
    return hashMap;
}

export function getHashMapLength(hashMapStruct: Object): number {
    return Object.getOwnPropertyDescriptor(Ice.HashMap.prototype, 'size')
        .get.call(hashMapStruct);
}
