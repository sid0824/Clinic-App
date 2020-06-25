import { call, takeLatest, select, put, delay, fetch } from 'redux-saga/effects';

import { message, notification } from 'antd';
import request from 'utils/request';
import { BASE_URL } from 'utils/api';

import {
  CreatePatientReqSuccess,
  CreatePatientReqFail
} from './actions';

import {
  CREATE_PATIENT_REQ
} from './constants';
import history from '../../utils/history';

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
 * Create patient request
 */
export function* createPatientReq(params) {
  try {
    const dataObj = params.data;
    const requestURL = `${BASE_URL}/api/v1/doctor/patient/create`;

    const response = yield call(request, requestURL, {
      method: 'POST',
      body: dataObj,
    });

    const data = response;

    if (response) {
      yield put(CreatePatientReqSuccess(data));
      yield call(forwardTo, '/dashboard');
      openNotification('success', data.message);
    } else {
      yield put(CreatePatientReqFail(data));
      openNotification('error', data.message);
    }
  } catch (error) {
    console.log("Error: ", error);
  }
}


export default function* defaultSaga() {
  yield takeLatest(CREATE_PATIENT_REQ, createPatientReq);
}


/**
 * Helper to handle navigation from sagas.
 * @param  {String} location The path to navigate
 */
function forwardTo(location) {
  history.push(location);
}
