/* eslint-disable no-duplicate-case */
import {
  CREATE_PATIENT_REQ,
  CREATE_PATIENT_REQ_SUCCESS,
  CREATE_PATIENT_REQ_ERROR,
} from './constants';

export const initialState = {
  patients: [],
  loading: true,
  createPatientSuccess: '',
};

const patientsReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case

  let newState;

  switch (action.type) {
    case CREATE_PATIENT_REQ_SUCCESS:
      newState = {
        ...state,
        createPatientSuccess: action.data.messge
      };
      return newState
    default:
      return state;
  }
};

export default patientsReducer;
