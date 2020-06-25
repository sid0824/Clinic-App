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
  DrugHowListReqSuccess,
  DrugWhenListReqSuccess,
  DrugWithListReqSuccess,
  DoReqCreateSuccess,
  DoReqCreate,
  DoReqList,
  DoReqListSuccess,
  DoReqSearch,
  DoReqSearchSuccess,
  DontReqCreateSuccess,
  DontReqCreate,
  DontReqList,
  DontReqListSuccess,
  DontReqSearch,
  DontReqSearchSuccess,
} from './action';

import {
  CREATE_PRESCRIPTION_REQ,
  DRUGS_LIST_REQ,
  DRUG_HOW_REQ,
  DRUG_WITH_REQ,
  DRUG_WHEN_REQ,
  DO_REQ_CREATE,
  DO_REQ_CREATE_SUCCESS,
  DO_REQ_LIST,
  DO_REQ_LIST_SUCCESS,
  DO_REQ_SEARCH,
  DO_REQ_SEARCH_SUCCESS,
  DONT_REQ_CREATE,
  DONT_REQ_CREATE_SUCCESS,
  DONT_REQ_LIST,
  DONT_REQ_LIST_SUCCESS,
  DONT_REQ_SEARCH,
  DONT_REQ_SEARCH_SUCCESS,
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

/**
 * Drugs How List request
 */
export function* getDrugHowListReq() {
  try {
    const requestURL = `${BASE_URL}/api/v1/lib/how/list`;

    const response = yield call(request, requestURL, {
      method: 'GET',
    });

    if (response) {
      yield put(DrugHowListReqSuccess(response.results));
      // openNotification('success', data.message);
    } else {
      // yield put(DrugsListReqFail(response));
      // openNotification('error', data.message);
    }
  } catch (error) {
    console.log('Error: ', error);
  }
}

/**
 * Drugs with List request
 */
export function* getDrugWithListReq() {
  try {
    const requestURL = `${BASE_URL}/api/v1/lib/with/list`;

    const response = yield call(request, requestURL, {
      method: 'GET',
    });

    if (response) {
      yield put(DrugWithListReqSuccess(response.results));
      // openNotification('success', data.message);
    } else {
      // yield put(DrugsListReqFail(response));
      // openNotification('error', data.message);
    }
  } catch (error) {
    console.log('Error: ', error);
  }
}

/**
 * Drugs when List request
 */
export function* getDrugWhenListReq() {
  try {
    const requestURL = `${BASE_URL}/api/v1/lib/when/list`;

    const response = yield call(request, requestURL, {
      method: 'GET',
    });

    if (response) {
      yield put(DrugWhenListReqSuccess(response.results));
      // openNotification('success', data.message);
    } else {
      // yield put(DrugsListReqFail(response));
      // openNotification('error', data.message);
    }
  } catch (error) {
    console.log('Error: ', error);
  }
}

/**
 * Do List request
 */
export function* getDoListReq() {
  try {
    const requestURL = `${BASE_URL}/api/v1/lib/do/list`;

    const response = yield call(request, requestURL, {
      method: 'GET',
    });

    if (response) {
      yield put(DoReqListSuccess(response.results));
      // openNotification('success', data.message);
    } else {
      // yield put(DrugsListReqFail(response));
      // openNotification('error', data.message);
    }
  } catch (error) {
    console.log('Error: ', error);
  }
}

/**
 * Dont List request
 */
export function* getDontListReq() {
  try {
    const requestURL = `${BASE_URL}/api/v1/lib/dont/list`;

    const response = yield call(request, requestURL, {
      method: 'GET',
    });

    if (response) {
      yield put(DontReqListSuccess(response.results));
      // openNotification('success', data.message);
    } else {
      // yield put(DrugsListReqFail(response));
      // openNotification('error', data.message);
    }
  } catch (error) {
    console.log('Error: ', error);
  }
}

export default function* defaultSaga() {
  yield takeLatest(CREATE_PRESCRIPTION_REQ, createPrescriptionReq);
  yield takeLatest(DRUGS_LIST_REQ, getDrugsListReq);
  yield takeLatest(DRUG_HOW_REQ, getDrugHowListReq);
  yield takeLatest(DRUG_WITH_REQ, getDrugWithListReq);
  yield takeLatest(DRUG_WHEN_REQ, getDrugWhenListReq);
  yield takeLatest(DO_REQ_LIST, getDoListReq);
  yield takeLatest(DONT_REQ_LIST, getDontListReq);
}

/**
 * Helper to handle navigation from sagas.
 * @param  {String} location The path to navigate
 */
function forwardTo(location) {
  history.push(location);
}
