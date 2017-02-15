import {isType} from 'redux-typescript-actions';
import {addPersons, editPerson} from '../actions/persons.actions';

const initialState = {
    persons: [],
};

export default function (state = initialState, action) {
    if (isType(action, addPersons)) {
        return Object.assign({}, state, {
            persons: action.payload.persons,
        });
    }

    if (isType(action, editPerson)) {
        return Object.assign({}, state, {
            editPerson: unwrapPersonParamsForForm(action.payload.person),
        });
    }

    return state;
}

function unwrapPersonParamsForForm(person) { // FIXME Move to utils
    let obj = {};

    obj['name'] = person.name;

    Object.keys(person.data).map((key) => {
        obj[key] = person.data[key];
    });

    return obj;
}