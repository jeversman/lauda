import actionCreatorFactory from "redux-typescript-actions";

const factory = actionCreatorFactory();

export const addProfiles = factory<{profiles: any[]}>('ADD_PROFILES');
export const createProfile = factory<{profile: any}>('CREATE_PROFILE');
export const deleteProfile = factory<{profileName: string}>('DELETE_PROFILE');
export const getProfiles = factory('GET_PROFILES');