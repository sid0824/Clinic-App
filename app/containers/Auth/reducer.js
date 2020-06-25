/**
 *
 * Auth Reducer
 */

import { fromJS, Map } from 'immutable';
import produce from 'immer';
// import { stat } from 'fs';
import { act } from 'react-testing-library';
import {
  ON_CHANGE,
  SET_FORM,
  SUBMIT,
  AUTH_USER_ERROR,
  LOAD_CURRENT_USER,
  RESET_SUBMIT,
  RESET_SUBMIT_SUCCESS,
  LOAD_CURRENT_USER_SUCCESS,
} from './constants';

const initialState = fromJS({
  currentUser: false,
  loading: false,
  error: false,
  authToken: null,
  formType: 'login',
  errorData: '',
  email: '',
  password: '',
  loginData: Map({}),
  userDetails: {},
  confirm_password: '',
  resetSuccess: {},
});

const authPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case ON_CHANGE:
        draft.formType = 'login';
        break;
      case SET_FORM:
        draft.formType = action.formType;
        break;
      case LOAD_CURRENT_USER_SUCCESS:
        debugger;
        draft.userDetails = action.data;
        break;
      case SUBMIT:
        draft.email = action.email;
        draft.password = action.password;
        break;
      case RESET_SUBMIT:
        draft.key = action.key;
        draft.password = action.password;
        draft.confirm_password = action.confirm_password;
        break;
      case RESET_SUBMIT_SUCCESS:
        draft.resetSuccess = action.data;
    }
  });

export default authPageReducer;
