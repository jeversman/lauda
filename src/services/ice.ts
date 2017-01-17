import {Ice, Glacier2} from 'ice';
import assert from "utils/assert";
import {wrapIcePromise, wrapIceProxy} from "utils/ice";

import {PGen} from '../slices/PGen';

const config = require<Object>('../../ice.config.yaml');
config['Ice.Default.Host'] = location.hostname;

declare const process: any;

if (process.env.NODE_ENV === 'production') {
    const proto = location.protocol === "https:" ? "wss" : "ws";
    const port = location.port === ""
        ? proto === "wss" ? 443 : 80
        : location.port;

    config['Ice.Default.Router'] = `PGenGlacier2/router:${proto} -p ${port}`;
} else {
    config['Ice.Default.Router'] = 'PGenGlacier2/router:ws -p 10002';
}

let _context: {
    communicator?: Ice.Communicator;
    router?: Glacier2.RouterPrx;
    pgen?: PGen.ProfileDBPrx; // FIXME replace!
    session?: Glacier2.SessionPrx;
    adapter?: Ice.ObjectAdapter;
    clientCategory?: string;
} = {};

export function createCommunicator(): Ice.Communicator {
    const initData = new Ice.InitializationData();
    initData.properties = Ice.createProperties();

    for (let key of Object.keys(config)) {
        initData.properties.setProperty(key, `${config[key]}`);
    }

    return _context.communicator = Ice.initialize(initData);
}

// FIXME replace!
export function getPGen(): PGen.ProfileDBPrx {
    return _context.pgen;
}

export function createRouterSession(usernameOrToken: string, password: string = '') {
    return _context.router.createSession("123", "123")
        .then(session => {
            _context.session = session;
            return Promise.all([
                createAdapter(),
                retrieveClientCategory(),
                retrievePGenProxy(),
            ]);
        });
}

function createAdapter() {
    const origRouter = Object.getPrototypeOf(_context.router);
    return wrapIcePromise(
        getCommunicator()
            .createObjectAdapterWithRouter('CallbackAdapter', origRouter)
    ).then(adapter => {
        _context.adapter = adapter;
    });
}

function retrieveClientCategory() {
    return _context.router.getCategoryForClient()
        .then(category => {
            _context.clientCategory = category;
        });
}

// FIXME replace!
export function retrievePGenProxy() {
    return wrapIcePromise(
        PGen.ProfileDBPrx.checkedCast(getCommunicator().propertyToProxy('ProfileDB.Proxy'))
    ).then(pgen => {
        _context.pgen = wrapIceProxy(pgen);
    });
}

export function getCommunicator(): Ice.Communicator {
    assert(_context.communicator != null);

    return _context.communicator;
}

export function createCallbackIdentity(name: string): Ice.Identity {
    assert(_context.clientCategory != null);
    return new Ice.Identity(name, _context.clientCategory);
}

export function addServant<P>(prx: Ice.ObjectPrxStatic<P>,
                              servant: Ice.Object,
                              name: string = Ice.generateUUID()): P {
    const identity = createCallbackIdentity(name);
    return prx.uncheckedCast(_context.adapter.add(servant, identity));
}

export function setupRouterConnection(): Promise<Ice.Connection> {
    return wrapIcePromise(
        Glacier2.RouterPrx.checkedCast(getCommunicator().getDefaultRouter())
    ).then(proxy => wrapIceProxy(proxy)).then(router => {
        return router.getACMTimeout().then(timeout => {
            const connection = router.ice_getCachedConnection();

            if (timeout > 0) {
                connection.setACM(timeout, undefined, Ice.ACMHeartbeat.HeartbeatAlways);
            }

            connection.setCallback({
                closed() {
                    console.log('connection closed');
                },
                heartbeat() {
                    console.log('connection heartbeat');
                },
            });

            _context.router = router;

            return connection;
        });
    });
}

export function destroyCommunicator(): Promise<void> {
    return wrapIcePromise(getCommunicator().destroy()).then(() => {
        _context = {};
    });
}

