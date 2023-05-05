import createRequestSaga from "utils/createRequestSaga"


import {actions} from "./programReducer"
import { takeLatest } from "redux-saga/effects"




export default function* programSaga() {

    yield takeLatest(actions.getList.type, createRequestSaga(actions.getList.type, '/program/getProgramList'))

}
