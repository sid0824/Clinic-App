import { call, takeLatest, select, put } from 'redux-saga/effects';
import request from 'utils/request';
import { BASE_URL } from 'utils/api';

import { message, notification } from 'antd';
import history from '../../utils/history';

import {
  reqUserDetail,
  reqUserDetailSuccess,
  reqUserDetailFail,
} from './actions';

import {
  LOAD_USER_DETAILS,
  LOAD_USER_DETAILS_SUCCESS,
  LOAD_USER_DETAILS_FAIL,
  UPDATE_USER_DETAILS,
  UPDATE_USER_DETAILS_SUCCESS,
} from './constants';

const openNotification = (type, msg) => {
  notification[type]({
    message: type,
    description: msg,
  });
};

const INTERNAL_ERROR = 'Internal Server Error';

const error = msg => {
  const hide = message.warning(`${msg}`, 0);
  // Dismiss manually and asynchronously
  setTimeout(hide, 10000);
};

function* getUserDetailReq(params) {
  try {
    const code = params.data.code;
    const requestURL = `${BASE_URL}/api/v1/doctor/patient/${code}`;
    const response = yield call(request, requestURL, {
      method: 'GET',
    });

    // eslint-disable-next-line no-constant-condition
    if (response) {
      message.success('Response success');
      yield put(reqUserDetailSuccess(response));
      console.log("userDetailFromSaga:", response)
    } else {
      message.success('Response Fail');
      // yield put(addUserDetailsReqFail(data));
    }
    // eslint-disable-next-line no-unused-expressions
    response.message === INTERNAL_ERROR ? error(response.message) : '';
  } catch (error) {
    console.log(error);
  }
}

function* submitUpdateUserDetailReq(params) {
  try {
    const code = params.data.code;
    const Userdata = params.data;
    delete Userdata.code;

    const body = Userdata;
    const requestURL = `${BASE_URL}/api/v1/patient/update/${code}`;
    const response = yield call(request, requestURL, {
      method: 'PUT',
      body,
    });

    // eslint-disable-next-line no-constant-condition
    if (response) {
      message.success('Response success');
      yield put(reqUserDetailSuccess(response));
      yield call(forwardTo, '/dashboard');
    } else {
      message.success('Response Fail');
      // yield put(addUserDetailsReqFail(data));
    }
    // eslint-disable-next-line no-unused-expressions
    response.message === INTERNAL_ERROR ? error(response.message) : '';
  } catch (error) {
    console.log(error);
  }
}

export default function* defaultSaga() {
  yield takeLatest(LOAD_USER_DETAILS, getUserDetailReq);
  yield takeLatest(UPDATE_USER_DETAILS, submitUpdateUserDetailReq);
}

/**
 * Helper to handle navigation from sagas.
 * @param  {String} location The path to navigate
 */
function forwardTo(location) {
  history.push(location);
}
