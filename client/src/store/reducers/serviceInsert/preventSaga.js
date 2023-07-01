import createRequestSaga from "utils/createRequestSaga"
import api from "api/insertForm"

import {actions} from "./prevent"
import { takeLatest } from "redux-saga/effects"




export default function* preventSaga() {

    yield takeLatest(actions.getList.type, createRequestSaga(actions.getList.type, api.getList))
    yield takeLatest(actions.getListAfterSave.type, createRequestSaga(actions.getListAfterSave.type, api.getList))

}
