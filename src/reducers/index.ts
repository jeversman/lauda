import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

import mainReducer from './mainReducer';

const rootReducer = combineReducers({
    mainReducer: mainReducer,
    form: formReducer,
});

export default rootReducer;