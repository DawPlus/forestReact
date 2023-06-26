

import { all  } from 'redux-saga/effects';

import serviceSaga from "./serviceSaga";
import programSaga from "./programSaga"

export default function* rootSaga() {
    yield all([
        serviceSaga(),
        programSaga()        
    ]);
} 
