import createRequestSaga from "utils/createRequestSaga"
import api from "api/programList"

import {actions} from "./programReducer"
import { takeLatest } from "redux-saga/effects"




export default function* programSaga() {

    yield takeLatest(actions.getTempList.type, createRequestSaga(actions.getTempList.type, api.getTempList))
    yield takeLatest(actions.getTempData.type, createRequestSaga(actions.getTempData.type, api.getTempData))

}
