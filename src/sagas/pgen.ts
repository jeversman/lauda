// TODO Separate
import {takeEvery} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import {PGen} from '../slices/PGen';
import {getPGen, createRouterSession} from 'services/ice';
import {connectionEstablished} from '../actions/connection.actions';
// import {retrieveProfile} from '../actions/profiles.actions';
// import {bindAsyncAction} from 'utils/sagas';

import {deleteNeedlessParameters} from '../utils/profiles';

// const retrieveProfileWorker = bindAsyncAction(
//     retrieveProfile,
//     getProfile
// );

// function* getProfile(args): any {
//     console.log('GET PROFILE SAGA BEGIN');
//     console.log(args.profileName);
//
//     const pgen: PGen.ProfileDBPrx = yield call(getPGen);
//
//     console.log('GET PROFILE SAGA END');
//     return yield call(pgen.get, args.profileName);
//     // return yield call(pgen.profileNameList);
// }

export function* getProfiles(): any {
    console.log('GET PROFILES SAGA BEGIN');

    const pgen: PGen.ProfileDBPrx = yield call(getPGen);
    // let profilesNames = yield call(pgen.profiles);
    let profiles = yield call(pgen.profiles);

    console.log(profiles);

    for (let key in profiles) {
        profiles[key].data = deleteNeedlessParameters(['__address'], profiles[key].data);
    }

    // for (let i in profilesNames) {
    //     let profile = yield call(pgen.get, profilesNames[i]);
    //     profile['name'] = profilesNames[i];
    //     profile = deleteNeedlessParameters(['__address'], profile);
    //     profiles.push(profile);
    // }
    
    yield put({type: 'ADD_PROFILES', profiles: profiles});
    
    console.log('GET PROFILES SAGA END');
}

export function* createRouterSessionSaga(): any {
    console.log('CREATE ROUTER SESSION SAGA BEGIN');
    yield call(createRouterSession);
    yield put({type: 'GET_PROFILES'});
    console.log('CREATE ROUTER SESSION SAGA END');
}

export function* createProfile(args): any {
    console.log('CREATE PROFILE BEGIN');
    console.log(args);

    let profileData = new ProfileData();

    for (let key in args.profile) {
        profileData[key] = args.profile[key];
    }

    const pgen: PGen.ProfileDBPrx = yield call(getPGen);
    yield call(pgen.set, args.profile.name, profileData);
    yield put({type: 'GET_PROFILES'});

    console.log('CREATE PROFILE END');
}

export function* deleteProfile(args): any {
    console.log('DELETE PROFILE BEGIN');
    console.log(args);

    const pgen: PGen.ProfileDBPrx = yield call(getPGen);
    yield call(pgen.remove, args.profileName);
    yield put({type: 'GET_PROFILES'});

    console.log('DELETE PROFILE END');
}

export default function* pgenSaga(): any {
    yield takeEvery(connectionEstablished.type, createRouterSessionSaga);
    yield takeEvery('GET_PROFILES', getProfiles);
    // yield takeEvery('GET_PROFILE', retrieveProfileWorker);
    yield takeEvery('CREATE_PROFILE', createProfile);
    yield takeEvery('DELETE_PROFILE', deleteProfile);

}

// TODO Move to models?
class Profile extends PGen.Profile {
    constructor() {
        super();
    }
}

class ProfileData extends PGen.ProfileData {
    constructor() {
        super();
    }
}