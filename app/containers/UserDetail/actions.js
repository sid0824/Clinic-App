import {
  LOAD_USER_DETAILS,
  LOAD_USER_DETAILS_SUCCESS,
  LOAD_USER_DETAILS_FAIL,
  UPDATE_USER_DETAILS,
  UPDATE_USER_DETAILS_SUCCESS,
} from './constants';

export const reqUserDetail = data => ({
  type: LOAD_USER_DETAILS,
  data,
});

export const reqUserDetailSuccess = data => ({
  type: LOAD_USER_DETAILS_SUCCESS,
  data,
});

export const reqUserDetailFail = data => ({
  type: LOAD_USER_DETAILS_FAIL,
  data,
});

export const reqUpdateUserDetail = data => ({
  type: UPDATE_USER_DETAILS,
  data,
});

export const reqUpdateUserDetailSuccess = data => ({
  type: UPDATE_USER_DETAILS_SUCCESS,
  data,
});
