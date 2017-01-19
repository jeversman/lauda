import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

import persons from './persons';

const rootReducer = combineReducers({
    persons,
    form: formReducer,
});

export default rootReducer;