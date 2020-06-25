import { call, takeLatest, select, put, delay, fetch } from 'redux-saga/effects';

import { message, notification } from 'antd';
import request from 'utils/request';
import { BASE_URL } from 'utils/api';

import {
  requestPatientListSuccess,
  requestPatientListFail,
  CreatePatientReqSuccess,
  CreatePatientReqFail
} from './actions';

import {
  LOAD_PATIENT_LIST,
  CREATE_PATIENT_REQ
} from './constants';

const openNotification = (type, msg) => {
  notification[type]({
    message: type,
    description: msg,
  });
};

const error = msg => {
  const hide = message.warning(`${msg}`, 0);
  setTimeout(hide, 10000);
};

/**
 * Get patient list req
 */
export function* getPatientList(page) {
  try {

    const pageNum = page.data;
    const requestURL = `${BASE_URL}/api/v1/doctor/patient/list`;

    const response = yield call(request, requestURL, {
      method: 'GET',
    });

    const data = response;
    if (response) {
      yield put(requestPatientListSuccess(data));
      // openNotification('success', data.message);
    } else {
      // yield put(requestPatientListFail(data));
      // openNotification('error', data.message);
    }
  } catch (error) {
    console.log("Error: ", error);
  }
}


export default function* defaultSaga() {
  yield takeLatest(LOAD_PATIENT_LIST, getPatientList);
}
