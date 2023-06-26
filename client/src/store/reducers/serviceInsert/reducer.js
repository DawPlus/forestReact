import { combineReducers } from 'redux';

import {reducer as service} from "./service";
import {reducer as program} from "./program";
// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    service ,
    program
});


export default reducer;
