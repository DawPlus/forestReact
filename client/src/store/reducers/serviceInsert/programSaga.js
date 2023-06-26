import createRequestSaga from "utils/createRequestSaga"
import api from "api/insertForm"

import {actions} from "./service"
import { takeLatest } from "redux-saga/effects"




export default function* programSaga() {

    yield takeLatest(actions.getPreviousServiceList.type, createRequestSaga(actions.getPreviousServiceList.type, api.getPreviousServiceList))
    yield takeLatest(actions.getPreviousServiceListAfterSave.type, createRequestSaga(actions.getPreviousServiceListAfterSave.type, api.getPreviousServiceList))

}
