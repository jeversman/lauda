import actionCreatorFactory from "redux-typescript-actions";

const factory = actionCreatorFactory();

// export const deleteProfile = factory<{profileName: string}>('DELETE_PROFILE');
export const createPerson = factory<{person: any}>('CREATE_PERSON');
export const getPersons = factory('GET_PERSONS');
export const addPersons = factory<{persons: any[]}>('ADD_PERSONS');