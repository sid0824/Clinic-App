import {
  call,
  takeLatest,
  select,
  put,
  delay,
  fetch,
} from 'redux-saga/effects';

import { message, notification } from 'antd';
import request from 'utils/request';
import { BASE_URL } from 'utils/api';

import {
  CreatePrescriptionReqSuccess,
  CreatePrescriptionReqFail,
  DrugsListReqSuccess,
  DrugsListReqFail,
} from './action';

import { CREATE_PRESCRIPTION_REQ, DRUGS_LIST_REQ } from './constants';
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
 * Create Prescription request
 */
export function* createPrescriptionReq(params) {
  try {
    const dataObj = params.data;
    const requestURL = `${BASE_URL}/api/v1/prescription/create/${dataObj.id}`;

    const response = yield call(request, requestURL, {
      method: 'POST',
      body: dataObj,
    });

    const data = response;

    if (response) {
      yield put(CreatePrescriptionReqSuccess(data));
      yield call(forwardTo, '/dashboard');
      openNotification('success', data.message);
    } else {
      yield put(CreatePrescriptionReqFail(data));
      openNotification('error', data.message);
    }
  } catch (error) {
    console.log('Error: ', error);
  }
}

/**
 * Drugs List request
 */
export function* getDrugsListReq() {
  try {
    const requestURL = `${BASE_URL}/api/v1/drugs/list`;

    const response = yield call(request, requestURL, {
      method: 'GET',
    });

    if (response) {
      yield put(DrugsListReqSuccess(response.results));
      // openNotification('success', data.message);
    } else {
      yield put(DrugsListReqFail(response));
      // openNotification('error', data.message);
    }
  } catch (error) {
    console.log('Error: ', error);
  }
}

export default function* defaultSaga() {
  yield takeLatest(CREATE_PRESCRIPTION_REQ, createPrescriptionReq);
  yield takeLatest(DRUGS_LIST_REQ, getDrugsListReq);
}

/**
 * Helper to handle navigation from sagas.
 * @param  {String} location The path to navigate
 */
function forwardTo(location) {
  history.push(location);
}
