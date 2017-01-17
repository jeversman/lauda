export function addProfile(profile) {
    return {
        type: 'ADD_PROFILE',
        profile,
    };
}

export function addProfileToAccount(accountId, profileName) {
    return {
        type: 'ADD_PROFILE_TO_ACCOUNT',
        accountId, 
        profileName,
    };
}

export function getProfile() {
    return {
        type: 'GET_PROFILE',
    };
}