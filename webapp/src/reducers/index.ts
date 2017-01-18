import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

import profiles from './profiles';
import accounts from './accounts';

const rootReducer = combineReducers({
    profiles,
    accounts,
    form: formReducer,
});

export default rootReducer;