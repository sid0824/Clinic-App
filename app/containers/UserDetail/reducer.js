import produce from 'immer';
import { debug } from 'util';
import {
  LOAD_USER_DETAILS,
  LOAD_USER_DETAILS_SUCCESS,
  LOAD_USER_DETAILS_FAIL,
} from './constants';
export const initialStateUserDetail = {
  userDetails: {
    user: {
      id: '',
      first_name: '',
      last_name: '',
      email: '',
    },
    user_detail: {
      id: '',
      phone: '',
      profile_image: '',
      time_zone: '',
      identity: ''
    },
    gender: '',
    dob: '',
    age: '',
    guardian: '',
    identity_number: '',
    parent: '',
  },
  loading: true,
  reqSuccess: '',
  reqFail: '',
  updateUserDetail: {},
  updateUserOrg: {},
  updateUSerPassword: {},
};
// };

// /* eslint-disable default-case, no-param-reassign */
// const userDetailReducer = (state = initialStateUserDetail, action) =>
//   produce(state, draft => {
//     switch (action.type) {
//       case LOAD_USER_DETAILS:
//         draft.loading = true;
//         draft.error = false;
//         draft.userData.repositories = false;
//         break;

//       case LOAD_USER_DETAILS_SUCCESS:
//         draft.userData.repositories = action.repos;
//         draft.loading = false;
//         draft.currentUser = action.username;
//         break;

//       case LOAD_USER_DETAILS_FAIL:
//         draft.error = action.error;
//         draft.loading = false;
//         break;
//     }
//   });

const userDetailReducer = (state = initialStateUserDetail, action) => {
  let newState;
  switch (action.type) {
    case LOAD_USER_DETAILS:
      newState = { ...state, loading: true };
      return newState;
    case LOAD_USER_DETAILS_SUCCESS:
      newState = { ...state, userDetails: action.data };
      return newState;
    case LOAD_USER_DETAILS_FAIL:
      newState = { ...state };
      return newState;

    default:
      return state;
  }
};

export default userDetailReducer;
