/* eslint-disable no-duplicate-case */
import {
  CREATE_PRESCRIPTION_REQ,
  CREATE_PATIENT_REQ_SUCCESS,
  CREATE_PRESCRIPTION_REQ_ERROR,
  CREATE_PRESCRIPTION_REQ_SUCCESS,
  DRUGS_LIST_SUCCESS,
  DRUG_HOW_REQ_SUCCESS,
  DRUG_WHEN_REQ_SUCCESS,
  DRUG_WITH_REQ_SUCCESS,
  DO_REQ_CREATE_SUCCESS,
  DO_REQ_LIST_SUCCESS,
  DO_REQ_SEARCH_SUCCESS,
  DONT_REQ_LIST_SUCCESS,
  DONT_REQ_SEARCH_SUCCESS,
} from './constants';

export const initialState = {
  prescription: [],
  loading: true,
  createPrescriptionSuccess: '',
  howList: [],
  whenList: [],
  withList: [],
  doList: [],
  dontList: [],
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
    case DRUG_HOW_REQ_SUCCESS:
      newState = {
        ...state,
        howList: action.data,
      };
      return newState;
    case DRUG_WHEN_REQ_SUCCESS:
      newState = {
        ...state,
        whenList: action.data,
      };
      return newState;
    case DRUG_WITH_REQ_SUCCESS:
      newState = {
        ...state,
        withList: action.data,
      };
      return newState;
    case DO_REQ_CREATE_SUCCESS:
      newState = {
        ...state,
      };
      return newState;
    case DO_REQ_LIST_SUCCESS:
      newState = {
        ...state,
        doList: action.data,
      };
      return newState;
    case DO_REQ_SEARCH_SUCCESS:
      newState = {
        ...state,
        doList: action.data,
      };
      return newState;
    case DONT_REQ_LIST_SUCCESS:
      newState = {
        ...state,
        dontList: action.data,
      };
      return newState;
    case DONT_REQ_SEARCH_SUCCESS:
      newState = {
        ...state,
        dontList: action.data,
      };
      return newState;
    default:
      return state;
  }
};

export default prescriptionReducer;
