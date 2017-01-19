import {isType} from 'redux-typescript-actions';
import {addPersons} from '../actions/persons.actions';

const initialState = {
    persons: [],
};

export default function (state = initialState, action) {
    if (isType(action, addPersons )) {
        return Object.assign({}, state, {
            persons: action.payload.persons,
        });
    }

    return state;
}