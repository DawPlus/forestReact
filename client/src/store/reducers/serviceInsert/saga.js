

import { all  } from 'redux-saga/effects';

import serviceSaga from "./serviceSaga";

export default function* rootSaga() {
    yield all([
        serviceSaga()        
    ]);
} 
