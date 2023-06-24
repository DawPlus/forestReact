import { combineReducers } from 'redux';
import { all  } from 'redux-saga/effects';

import {reducer as service} from "./service";
// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    service 
});



export function* serviceInsertSaga() {
    yield all([
        
    ]); // all은 배열안의 여러 사가를 동시에 실행시킨다.
} 


export default reducer;
