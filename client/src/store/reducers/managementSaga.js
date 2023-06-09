
import createRequestSaga from "utils/createRequestSaga";
import api from "api/management"
import {actions} from "./managementReducer"
import { takeLatest } from "redux-saga/effects"



export default function* managementSaga() {

    yield takeLatest(actions.getBaseInfoPage.type, createRequestSaga(actions.getBaseInfoPage.type, api.getBaseInfoPage))
    yield takeLatest(actions.getRegUser.type, createRequestSaga(actions.getRegUser.type, api.getRegUser))
    yield takeLatest(actions.getAllHistories.type, createRequestSaga(actions.getAllHistories.type, api.getAllHistories))
    yield takeLatest(actions.getHistory.type, createRequestSaga(actions.getHistory.type, api.getHistory))

}
