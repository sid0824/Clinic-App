import { createSelector } from 'reselect';
// import { stat } from 'fs';
import { ENGINE_METHOD_RAND } from 'constants';
import { initialState } from './reducer';

const selectUsersPage = state => state.users || initialState;

console.log('users state:', initialState);
const makeSelectUserDetails = () => {
  createSelector(
    selectUsersPage,
    state => state.userDetails,
  );
};

const makeSelectUserRoles = () => {
  createSelector(
    selectUsersPage,
    state => state.userRoles,
  );
};

export default selectUsersPage;

// export default selectUsersPage;
export { makeSelectUserDetails, makeSelectUserRoles };
