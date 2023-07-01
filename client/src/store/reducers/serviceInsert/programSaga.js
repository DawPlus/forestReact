import createRequestSaga from "utils/createRequestSaga"
import api from "api/insertForm"

import {actions} from "./program"
import { takeLatest } from "redux-saga/effects"




export default function* programSaga() {

    yield takeLatest(actions.getPreviousProgramList.type, createRequestSaga(actions.getPreviousProgramList.type, api.getList))
    yield takeLatest(actions.getPreviousProgramListAfterSave.type, createRequestSaga(actions.getPreviousProgramListAfterSave.type, api.getList))

}
