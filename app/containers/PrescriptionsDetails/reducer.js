/* eslint-disable no-duplicate-case */
import {
  CREATE_PRESCRIPTION_REQ,
  CREATE_PATIENT_REQ_SUCCESS,
  CREATE_PRESCRIPTION_REQ_ERROR,
  CREATE_PRESCRIPTION_REQ_SUCCESS,
  DRUGS_LIST_SUCCESS,
} from './constants';

export const initialState = {
  prescription: [],
  loading: true,
  createPrescriptionSuccess: '',
};

const prescriptionReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case

  let newState;

  switch (action.type) {
    case CREATE_PRESCRIPTION_REQ_SUCCESS:
      newState = {
        ...state,
        createPrescriptionSuccess: action.data.messge,
      };
      return newState;
    case DRUGS_LIST_SUCCESS:
      newState = {
        ...state,
        getDrugsListSuccess: action.data,
      };
      return newState;
    default:
      return state;
  }
};

export default prescriptionReducer;
