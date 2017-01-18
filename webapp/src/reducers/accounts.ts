import {assign} from 'lodash';
import {isType} from 'redux-typescript-actions';

import {addProfileToAccount} from '../actions/accounts.actions';

const initialState = {
    accounts: [
        {id: 1, name: 'account 1', profile: 'none'},
        {id: 2, name: 'account 2', profile: 'none'},
    ],
};

export default function (state = initialState, action) {
    if (isType(action, addProfileToAccount)) {
        return assign({}, state, {
            accounts: state.accounts.map((account) => {
                return account.id === action.payload.accountId ?
                    assign({}, account, {profile: action.payload.profileName}) :
                    account;
            }),
        });
    }

    return state;
}