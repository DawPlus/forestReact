import createRequestSaga from "utils/createRequestSaga"
import api from "api/yearMonth"

import {actions} from "./yearMonthResultReducer"
import { takeLatest } from "redux-saga/effects"




export default function* yearMonthResultSaga() {

    yield takeLatest(actions.getPartTypeList.type, createRequestSaga(actions.getPartTypeList.type, api.getPartTypeList))

}
