/* eslint-disable no-else-return */
/**
 * Validation errors constants
 * All error validation messages will appear here.
 */

export const BLANK_ER = 'This field cannot be left blank';

export const FIRST_NAME_ER = 'Please enter a valid first name';
export const LAST_NAME_ER = 'Please enter a valid last name';
export const FULL_NAME_ER = 'Please enter full name.';
export const EMAIL_ER = 'Please enter a valid email address';
export const PHONE_ER = 'Please enter valid number.';
export const COMPANY_NAME_ER = 'Please enter company name.';
export const ABN_ER = 'Please enter ABN number.';
export const ADDRESS_ER = 'Please enter address.';
export const SUBRUB_ER = 'Please enter subrub.';
export const POST_CODE_ER = 'Please enter post code.';
export const STATE_ER = 'Please select state.';
export const COUNTRY_ER = 'Please select country.';
export const ALLOW_ALPHA_ONLY =
  'Name should not have special characters or numbers.';
export const REQUIRED = 'This field is required.';
export const MAX_CHAR_ER = 'fdfdgf.';

export const TRIM_SAPCE = (value, prevValue = []) => {
  if (value === ' ') {
    return [];
  }
  // else if (
  //   prevValue[prevValue.length - 1] === ' ' &&
  //   value[value.length - 2] === ' '
  // ) {
  //   return value.trim();
  // }
  return value;
};
