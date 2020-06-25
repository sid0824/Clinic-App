/**
 *
 * Auth actions
 *
 */

import {
  ON_CHANGE,
  SET_FORM,
  SUBMIT,
  FORGOT_SUBMIT,
  AUTH_USER,
  AUTH_USER_ERROR,
  AUTH_USER_SUCCESS,
  LOAD_CURRENT_USER,
  LOAD_CURRENT_USER_ERROR,
  LOAD_CURRENT_USER_SUCCESS,
  RESET_SUBMIT,
  RESET_SUBMIT_SUCCESS,
} from './constants';

/**
 * Modifies the input's value
 * @param {Object} target input data
 * @return {Object}
 */

export function onChange({ target }) {
  return {
    type: ON_CHANGE,
    key: target.name,
    value: target.value,
  };
}

/**
 * Generates the form depending in the URL's params
 * @param {string} functionType Login, register,
 * @param { string|undefined} email to rest his password
 */

export function setForm(formType, email) {
  let data;

  switch (formType) {
    case 'login':
      data = {
        email: '',
        password: '',
      };
      break;

    case 'reset-password':
      data = {
        password: '',
        confirmPassword: '',
        code: email,
      };
      break;

    case 'forgot-password':
      data = {
        email: '',
      };
      break;
    default:
      data = {};
  }

  return {
    type: SET_FORM,
    data,
    formType,
  };
}

/**
 *
 * Sends the request to the API
 * @return {String}
 */

export function submit(data) {
  return {
    type: SUBMIT,
    data,
  };
}

/**
 *
 * Sends the request to the API
 * @return {String}
 */

export function loginSubmit(params) {
  return {
    type: SUBMIT,
    email: params.email,
    password: params.password,
  };
}

export function loginError(error) {
  return {
    type: AUTH_USER_ERROR,
    error,
  };
}

export function reqForgotPassword(data) {
  return {
    type: FORGOT_SUBMIT,
    data,
  };
}

export function getLoggedUserDetails(data) {
  return {
    type: LOAD_CURRENT_USER_SUCCESS,
    data,
  };
}

export function updateResetPassword(params) {
  return {
    type: RESET_SUBMIT,
    data: params,
  };
}
