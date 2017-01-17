import actionCreatorFactory from 'redux-typescript-actions';
// import {PGen} from '../slices/PGen';

const factory = actionCreatorFactory();

export const retrieveProfile = factory.async<any, any>('RETRIEVE_PROFILE');
// export const createProfile = factory<{profile: any}>('CREATE_PROFILE');

export function createProfile(profile) {
    return {
        type: 'CREATE_PROFILE',
        profile,
    };
}

export function getProfiles() {
    return {
        type: 'GET_PROFILES',
    };
}

export function addProfiles(profiles) {
    return {
        type: 'ADD_PROFILES',
        profiles,
    };
}

export function deleteProfile(profileName) {
    return {
        type: 'DELETE_PROFILE',
        profileName,
    };
}