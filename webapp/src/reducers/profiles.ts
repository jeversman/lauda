import {isType} from 'redux-typescript-actions';
import {addProfiles} from '../actions/profiles.actions';

const initialState = {
    profiles: [],
};

export default function (state = initialState, action) {
    if (isType(action, addProfiles)) {
        return Object.assign({}, state, {
            profiles: action.payload.profiles,
        });
    }

    return state;
}