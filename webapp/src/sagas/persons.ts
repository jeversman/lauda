// import {takeEvery} from 'redux-saga';
// import {call, put} from 'redux-saga/effects';
// import {connectionEstablished} from '../actions/connection.actions';
//
// import {deleteNeedlessParameters} from '../utils/profiles';
//
// import {addProfiles, createProfile, deleteProfile} from '../actions/profiles.actions.ts';
//
// export function* getProfiles(): any {
//     const pgen: PGen.ProfileDBPrx = yield call(getPGen);
//     let profiles = yield call(pgen.profiles);
//
//     for (let key in profiles) {
//         profiles[key].data = deleteNeedlessParameters(['__address'], profiles[key].data);
//     }
//
//     yield put(addProfiles({profiles}));
// }
//
// export function* createProfileSaga(action): any {
//     let profileData = new PGen.ProfileData();
//
//     for (let key in action.payload.profile) {
//         profileData[key] = action.payload.profile[key];
//     }
//
//     const pgen: PGen.ProfileDBPrx = yield call(getPGen);
//     yield call(pgen.set, action.payload.profile.name, profileData);
//     yield call(getProfiles);
// }
//
// export function* deleteProfileSaga(action): any {
//     const pgen: PGen.ProfileDBPrx = yield call(getPGen);
//     yield call(pgen.remove, action.payload.profileName);
//     yield call(getProfiles);
// }
//
// export default function* profileSaga(): any {
//     yield takeEvery(connectionEstablished.type, createRouterSessionSaga);
//     yield takeEvery(createProfile.type, createProfileSaga);
//     yield takeEvery(deleteProfile.type, deleteProfileSaga);
// }
//
// send(socket) {
//     console.log('Send update msg');
//     socket.emit('updatePersons', data);
// }