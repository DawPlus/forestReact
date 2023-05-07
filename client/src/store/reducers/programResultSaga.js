
import createRequestSaga from "utils/createRequestSaga";
import api from "api/programResult"
import {actions} from "./programResultReducer"
import { takeLatest } from "redux-saga/effects"



export default function* programResultSaga() {
    yield takeLatest(actions.getProgramAgency.type, createRequestSaga(actions.getProgramAgency.type, api.getProgramAgency))
    yield takeLatest(actions.getProgramResult.type, createRequestSaga(actions.getProgramResult.type, api.getProgramResult))
    
    yield takeLatest(actions.getFaciltyList.type, createRequestSaga(actions.getFaciltyList.type, api.getProgramResult))
    
}
