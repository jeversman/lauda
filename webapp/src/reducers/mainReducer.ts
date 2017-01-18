import {assign} from 'lodash';
// import {Action as ReduxAction} from 'redux';
// import {isType} from 'redux-typescript-actions';
// import {createProfile} from '../actions/profiles.actions';

const initialState = {
    profiles: [],
    accounts: [
        {id: 1, name: 'account 1', profile: 'none'},
        {id: 2, name: 'account 2', profile: 'none'},
    ],
};

// function addProfile(state, profile) {
//     console.log('ADD PROFILE CALLED');
//     console.log(profile);
//
//     let newState = state;
//     newState.profiles = newState.profiles.concat(profile);
//     return newState;
// }

function addProfiles(state, profiles) {
    console.log('ADD_PROFILES CALLED');
    console.log(profiles);

    return Object.assign({}, state, {
        profiles: profiles,
    });

}

function addProfileToAccount(state, accountId, profileName) {
    let newState = state;
    newState.accounts = newState.accounts.map((account) => {
        return account.id === accountId ?
            assign({}, account, {profile: profileName}) :
            account;
    });
    return newState;
}

export default function (state = initialState, action) {
    
    switch (action.type) {

        case 'ADD_PROFILES':
            // console.log('PROFILES RECEIVED');
            // console.log(action.profiles);
            // return state;
            return addProfiles(state, action.profiles);

        case 'ADD_PROFILE_TO_ACCOUNT':
            return addProfileToAccount(state, action.accountId, action.profileName);
            
        default:
            return state;
    }
}