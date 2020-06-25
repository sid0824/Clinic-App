import {
  CREATE_PATIENT_REQ,
  CREATE_PATIENT_REQ_SUCCESS,
  CREATE_PATIENT_REQ_ERROR,
  DRUGS_LIST_REQ,
  DRUGS_LIST_SUCCESS,
  DRUGS_LIST_ERROR
} from './constants';


/**
 *
 * CREATE PATIENTS ACTIONS
 */
export const CreatePatientReq = data => ({
  type: CREATE_PATIENT_REQ,
  data,
});

export const CreatePatientReqSuccess = data => ({
  type: CREATE_PATIENT_REQ_SUCCESS,
  data,
});

export const CreatePatientReqFail = data => ({
  type: CREATE_PATIENT_REQ_ERROR,
  data,
});
