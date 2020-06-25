import {
  CREATE_PRESCRIPTION_REQ,
  CREATE_PRESCRIPTION_REQ_SUCCESS,
  CREATE_PRESCRIPTION_REQ_ERROR,
  DRUGS_LIST_REQ,
  DRUGS_LIST_SUCCESS,
  DRUGS_LIST_ERROR,
  DRUG_HOW_REQ,
  DRUG_HOW_REQ_SUCCESS,
  DRUG_WHEN_REQ,
  DRUG_WHEN_REQ_SUCCESS,
  DRUG_WITH_REQ,
  DRUG_WITH_REQ_SUCCESS,
  DO_REQ_CREATE,
  DO_REQ_CREATE_SUCCESS,
  DO_REQ_LIST,
  DO_REQ_LIST_SUCCESS,
  DO_REQ_SEARCH,
  DO_REQ_SEARCH_SUCCESS,
  DONT_REQ_CREATE,
  DONT_REQ_CREATE_SUCCESS,
  DONT_REQ_LIST,
  DONT_REQ_LIST_SUCCESS,
  DONT_REQ_SEARCH,
  DONT_REQ_SEARCH_SUCCESS,
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

/**
 *
 * DRUGS LIST ACTIONS
 */
export const DrugHowListReq = () => ({
  type: DRUG_HOW_REQ,
});

export const DrugHowListReqSuccess = data => ({
  type: DRUG_HOW_REQ_SUCCESS,
  data,
});

/**
 *
 * DRUGS LIST ACTIONS
 */
export const DrugWhenListReq = () => ({
  type: DRUG_WHEN_REQ,
});

export const DrugWhenListReqSuccess = data => ({
  type: DRUG_WHEN_REQ_SUCCESS,
  data,
});

/**
 *
 * DRUGS LIST ACTIONS
 */
export const DrugWithListReq = () => ({
  type: DRUG_WITH_REQ,
});

export const DrugWithListReqSuccess = data => ({
  type: DRUG_WITH_REQ_SUCCESS,
  data,
});

/**
 *
 * Do LIST ACTIONS
 */
export const DoReqSearch = () => ({
  type: DO_REQ_SEARCH,
});

export const DoReqSearchSuccess = data => ({
  type: DO_REQ_SEARCH_SUCCESS,
  data,
});

/**
 *
 * Do LIST ACTIONS
 */
export const DoReqCreate = () => ({
  type: DO_REQ_CREATE,
});

export const DoReqCreateSuccess = data => ({
  type: DO_REQ_CREATE_SUCCESS,
  data,
});

/**
 *
 * Do LIST ACTIONS
 */
export const DoReqList = () => ({
  type: DO_REQ_LIST,
});

export const DoReqListSuccess = data => ({
  type: DO_REQ_LIST_SUCCESS,
  data,
});

/**
 *
 * Do LIST ACTIONS
 */
export const DontReqSearch = () => ({
  type: DONT_REQ_SEARCH,
});

export const DontReqSearchSuccess = data => ({
  type: DONT_REQ_SEARCH_SUCCESS,
  data,
});

/**
 *
 * Do LIST ACTIONS
 */
export const DontReqCreate = () => ({
  type: DONT_REQ_CREATE,
});

export const DontReqCreateSuccess = data => ({
  type: DONT_REQ_CREATE_SUCCESS,
  data,
});

/**
 *
 * Do LIST ACTIONS
 */
export const DontReqList = () => ({
  type: DONT_REQ_LIST,
});

export const DontReqListSuccess = data => ({
  type: DONT_REQ_LIST_SUCCESS,
  data,
});
