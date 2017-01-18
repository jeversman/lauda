import actionCreatorFactory from "redux-typescript-actions";

const factory = actionCreatorFactory();

export const addProfileToAccount = factory<{accountId: number, profileName: string}>('ADD_PROFILE_TO_ACCOUNT');