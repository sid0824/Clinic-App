/* eslint-disable no-duplicate-case */
import {
  LOAD_PATIENT_LIST,
  LOAD_PATIENT_LIST_SUCCESS,
  LOAD_PATIENT_LIST_FAIL,
  CREATE_PATIENT_REQ_ERROR,
  CREATE_PATIENT_REQ_SUCCESS
} from './constants';

export const initialState = {
  patients: [],
  loading: true,
  pagination: {},
  loadingDevice: false,
  createPatientSuccess: '',
};

const patientsReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case

  let newState;

  switch (action.type) {
    case LOAD_PATIENT_LIST:
      newState = { ...state, patients: [], loading: true };
      return newState;
    case LOAD_PATIENT_LIST_SUCCESS:
      newState = {
        ...state,
        patients: action.data.results,
        pagination: action.data.paginate,
        loading: false,
        deactivatedata: [],
        deactivateSelectionData: [],
        deactiveLoad: false,
      };
      return newState;
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
