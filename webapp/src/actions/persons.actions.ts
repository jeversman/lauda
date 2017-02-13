import actionCreatorFactory from "redux-typescript-actions";

const factory = actionCreatorFactory();

export const deletePerson = factory<{personName: string}>('DELETE_PERSON');
export const createPerson = factory<{person: any}>('CREATE_PERSON');
export const getPersons = factory('GET_PERSONS');
export const addPersons = factory<{persons: any[]}>('ADD_PERSONS');