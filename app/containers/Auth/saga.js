import { LOCATION_CHANGE } from 'react-router-redux';
import {
  all,
  call,
  fork,
  takeLatest,
  select,
  take,
  put,
  cancel,
  delay,
} from 'redux-saga/effects';
import { message, notification } from 'antd';
// import { API_CONFIG } from 'utils/api';
import { BASE_URL, REDIRECT_URL } from 'utils/api';
import { getLoggedUserDetails } from './actions';
import history from '../../utils/history';
import {
  LOAD_USER_DETAILS,
  ON_CHANGE,
  SET_FORM,
  SUBMIT,
  RESET_SUBMIT,
  FORGOT_SUBMIT,
} from './constants';

// Utils
import auth from '../../utils/auth';
import request from '../../utils/request';

import { makeSelectUsername, makeSelectPassword } from './selectors';

const openNotification = (type, msg) => {
  notification[type]({
    message: type,
    description: msg,
  });
};

export function* submitForm() {
  try {
    yield call(onLoading, true);
    const formType = 'login';

    // const getData = yield select(makeSelectModifiedData());
    const email = yield select(makeSelectUsername());
    const password = yield select(makeSelectPassword());

    console.log(process.env.REACT_APP_API);
    const loginData = {
      email,
      password,
    };

    const body = loginData;

    let requestURL;

    switch (formType) {
      case 'login':
        requestURL = `${BASE_URL}/api/v1/login`;
        break;
      case 'reset-password':
        requestURL = '';
        break;
      case 'forgot-password':
        requestURL = '';
        break;
      default:
    }

    const response = yield call(request, requestURL, {
      method: 'POST',
      body,
    });

    if (response.code === 200) {
      // set the user's credentials
      if (response.data.error) {
        openNotification('error', response.data.error_description);
        yield call(onLoading, false);
      } else {
        yield all([
          call(auth.setToken, response.data.access_token),
          call(auth.setUserInfo, response.data.token_type),
        ]);
        yield call(onLoading, false);

        yield call(forwardTo, '/dashboard');

        const submitWatcher = yield fork(takeLatest, SUBMIT, submitForm);
        yield cancel(submitWatcher);
      }
    } else {
      openNotification('error', response.message);
      yield call(onLoading, false);
    }
  } catch (error) {
    console.log('error-saga', error);
    // yield call(onError, false);
  }
}

function* getLoggedUserDetailReq() {
  try {
    const requestURL = `${BASE_URL}/v1/user/detail`;
    const response = yield call(request, requestURL, {
      method: 'GET',
    });
    // const { data } = response;
    const { data } = response;

    // eslint-disable-next-line no-constant-condition
    if (response.code === 200 || 201) {
      yield all([call(auth.setRoleInfo, data.type.name)]);
    } else {
      // yield put(addUserDetailsReqFail(data));
    }
    // eslint-disable-next-line no-unused-expressions
  } catch (error) {
    console.log(error);
  }
}

function* submitUpdateResetPasswordDetailReq(params) {
  yield call(onLoading, true);
  try {
    const TOKEN = params.data.token;
    const ID = params.data.id;
    const dataObj = Object.assign({
      password: params.data.password,
      confirm_password: params.data.confirm_password,
    });
    const requestURL = `${BASE_URL}/v1/reset/password/${TOKEN}/${ID}`;
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: dataObj,
    });

    // eslint-disable-next-line no-constant-condition
    if (response.code === 200 || 201) {
      openNotification('success', response.message);
      yield call(onLoading, false);
      // history.push('/login');
      window.location = REDIRECT_URL;
    }
  } catch (error) {
    console.log(error);
    openNotification('error', error.message);
    yield call(onLoading, false);
  }
}

function* reqForgotPassword(params) {
  yield call(onLoading, true);
  try {
    const body = params.data;
    const requestURL = `${BASE_URL}/api/v1/forgot/password`;
    const response = yield call(request, requestURL, {
      method: 'POST',
      body,
    });

    // eslint-disable-next-line no-constant-condition
    if (response.code === 200 && response.code) {
      openNotification('success', response.message);
      history.push('/login');
      setTimeout(() => {
        window.location = window.location;
      }, 500);
    } else {
      openNotification('error', response.message);
    }
    yield call(onLoading, false);
  } catch (error) {
    openNotification('error', error.message);
    yield call(onLoading, false);
  }
}

export default function* defaultSaga() {
  yield takeLatest(SUBMIT, submitForm);
  yield takeLatest(FORGOT_SUBMIT, reqForgotPassword);
  yield takeLatest(RESET_SUBMIT, submitUpdateResetPasswordDetailReq);
}

/**
 * Helper to handle navigation from sagas.
 * @param  {String} location The path to navigate
 */
function forwardTo(location) {
  history.push(location);
}

function onLoading(isLoad) {
  isLoad ? message.loading('Action in progress..', 0) : message.destroy();
  // Dismiss manually and asynchronously
  // setTimeout(hide, 2500);
}

function onError(data) {
  message.error(data.error_description, 5);
  // Dismiss manually and asynchronously
  // setTimeout(hide, 2500);
}
