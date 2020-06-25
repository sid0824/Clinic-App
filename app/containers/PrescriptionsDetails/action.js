import {
  CREATE_PRESCRIPTION_REQ,
  CREATE_PRESCRIPTION_REQ_SUCCESS,
  CREATE_PRESCRIPTION_REQ_ERROR,
  DRUGS_LIST_REQ,
  DRUGS_LIST_SUCCESS,
  DRUGS_LIST_ERROR,
} from './constants';

/**
 *
 * CREATE PATIENTS ACTIONS
 */
export const CreatePrescriptionReq = data => ({
  type: CREATE_PRESCRIPTION_REQ,
  data,
});

export const CreatePrescriptionReqSuccess = data => ({
  type: CREATE_PRESCRIPTION_REQ_SUCCESS,
  data,
});

export const CreatePrescriptionReqFail = data => ({
  type: CREATE_PRESCRIPTION_REQ_ERROR,
  data,
});

/**
 *
 * DRUGS LIST ACTIONS
 */
export const DrugsListReq = () => ({
  type: DRUGS_LIST_REQ,
});

export const DrugsListReqSuccess = data => ({
  type: DRUGS_LIST_SUCCESS,
  data,
});

export const DrugsListReqFail = data => ({
  type: DRUGS_LIST_ERROR,
  data,
});
