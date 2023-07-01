import { combineReducers } from 'redux';

import {reducer as service} from "./service";
import {reducer as program} from "./program";
import {reducer as counsel} from "./counsel";
import {reducer as prevent} from "./prevent";
import {reducer as healing} from "./healing";
import {reducer as hrv} from "./hrv";
import {reducer as vibra} from "./vibra";
// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    service ,
    program,
    counsel,
    prevent,
    healing,
    hrv,
    vibra,
    
});


export default reducer;
