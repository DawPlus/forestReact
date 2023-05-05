import { combineReducers } from 'redux';
import { all  } from 'redux-saga/effects';

// reducer import
import customizationReducer from './customizationReducer';
import commonReducer from  "./reducers/commonReducer"
import {reducer as programReducer} from "./reducers/programReducer"
import programSaga from "./reducers/programSaga";


// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    common : commonReducer,
    customization: customizationReducer,
    program: programReducer
});



export function* rootSaga() {
    yield all([
        programSaga()
    ]); // all은 배열안의 여러 사가를 동시에 실행시킨다.
} 


export default reducer;
