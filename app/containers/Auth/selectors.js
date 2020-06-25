import { createSelector } from 'reselect';
import { initialState } from './reducer';
/**
 *
 *
 * Direct selector to the authpage state domain
 */

const selectAuthPageDomain = state => state.auth;

/**
 * Other specific selectors
 */

const makeSelectFormType = () =>
  createSelector(
    selectAuthPageDomain,
    state => state.formType,
  );

const makeSelectModifiedData = () =>
  createSelector(
    selectAuthPageDomain,
    state => state,
  );

const makeSelectUsername = () =>
  createSelector(
    selectAuthPageDomain,
    state => state.email,
  );

const makeSelectPassword = () =>
  createSelector(
    selectAuthPageDomain,
    state => state.password,
  );
/**
 * Default selector used by AuthPage
 */

const makeSelectAuthPage = () =>
  createSelector(
    selectAuthPageDomain,
    substate => substate,
  );

export default makeSelectAuthPage;
export {
  makeSelectFormType,
  makeSelectUsername,
  makeSelectPassword,
  makeSelectModifiedData,
  selectAuthPageDomain,
};
