import {
  LOAD_PATIENT_LIST,
  LOAD_PATIENT_LIST_SUCCESS,
  LOAD_PATIENT_LIST_FAIL,
  LOAD_SCORES,
  LOAD_SCORES_SUCCESS,
  LOAD_SCORES_FAIL,
  LOAD_CANDIDATE_STATUS,
  LOAD_CANDIDATE_STATUS_SUCCESS,
  LOAD_CANDIDATE_STATUS_FAIL,
  LOAD_CANDIDATE_AGE,
  LOAD_CANDIDATE_AGE_SUCCESS,
  LOAD_CANDIDATE_AGE_FAIL,
  LOAD_GENDER,
  LOAD_GENDER_SUCCESS,
  LOAD_GENDER_FAIL,
  LOAD_ACCESS_DEVICE,
  LOAD_ACCESS_DEVICE_SUCCESS,
  LOAD_ACCESS_DEVICE_FAIL,
  GO_TO_USER_DETAILS,
  CREATE_PATIENT_REQ,
  CREATE_PATIENT_REQ_SUCCESS,
  CREATE_PATIENT_REQ_ERROR
} from './constants';

/**
 *
 * Patient list actions
 */
export const requestPatientList = data => ({
  type: LOAD_PATIENT_LIST,
  data,
});

export const requestPatientListSuccess = data => ({
  type: LOAD_PATIENT_LIST_SUCCESS,
  data,
});

export const requestPatientListFail = data => ({
  type: LOAD_PATIENT_LIST_FAIL,
  data,
});



/**
 *
 * CREATE PATIENTS ACTIONS
 */
// export const CreatePatientReq = data => ({
//   type: CREATE_PATIENT_REQ,
//   data,
// });

// export const CreatePatientReqSuccess = data => ({
//   type: CREATE_PATIENT_REQ_SUCCESS,
//   data,
// });

// export const CreatePatientReqFail = data => ({
//   type: CREATE_PATIENT_REQ_ERROR,
//   data,
// });

/**
 *
 * Score actions
 */
export const requestLoadScores = data => ({
  type: LOAD_SCORES,
  data,
});

export const requestLoadScoresSuccess = data => ({
  type: LOAD_SCORES_SUCCESS,
  data,
});

export const requestLoadScoresFail = data => ({
  type: LOAD_SCORES_FAIL,
  data,
});

/**
 *
 * Candidate status actions
 */
export const requestCandidateStatus = data => ({
  type: LOAD_CANDIDATE_STATUS,
  data,
});

export const requestCandidateStatusSuccess = data => ({
  type: LOAD_CANDIDATE_STATUS_SUCCESS,
  data,
});

export const requestCandidateStatusFail = data => ({
  type: LOAD_CANDIDATE_STATUS_FAIL,
  data,
});

/**
 *
 * Candidate age actions
 */
export const requestCandidateAge = data => ({
  type: LOAD_CANDIDATE_AGE,
  data,
});

export const requestCandidateAgeSuccess = data => ({
  type: LOAD_CANDIDATE_AGE_SUCCESS,
  data,
});

export const requestCandidateAgeFail = data => ({
  type: LOAD_CANDIDATE_AGE_FAIL,
  data,
});

/**
 *
 * Gender actions
 */
export const requestGender = data => ({
  type: LOAD_GENDER,
  data,
});

export const requestGenderSuccess = data => ({
  type: LOAD_GENDER_SUCCESS,
  data,
});

export const requestGenderFail = data => ({
  type: LOAD_GENDER_FAIL,
  data,
});

/**
 *
 * Access device actions
 */
export const requestAccessDevice = data => ({
  type: LOAD_ACCESS_DEVICE,
  data,
});

export const requestAccessDeviceSuccess = data => ({
  type: LOAD_ACCESS_DEVICE_SUCCESS,
  data,
});

export const requestAccessDeviceFail = data => ({
  type: LOAD_ACCESS_DEVICE_FAIL,
  data,
});

/**
 *
 * UserDetail actions
 */
export const goToUserDetails = data => ({
  type: GO_TO_USER_DETAILS,
  data,
});