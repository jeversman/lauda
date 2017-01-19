import actionCreatorFactory from "redux-typescript-actions";

const factory = actionCreatorFactory();

// export const createProfile = factory<{profile: any}>('CREATE_PROFILE');
// export const deleteProfile = factory<{profileName: string}>('DELETE_PROFILE');
export const getPersons = factory('GET_PERSONS');
export const addPersons = factory<{persons: any[]}>('ADD_PERSONS');