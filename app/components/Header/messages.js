/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.components.Header';

export default defineMessages({
  home: {
    id: `${scope}.home`,
    defaultMessage: 'Home',
  },
  features: {
    id: `${scope}.features`,
    defaultMessage: 'Features',
  },
  heatmaps: {
    id: `${scope}.heatmaps`,
    defaultMessage: 'Heatmaps (Beta)',
  },
  users: {
    id: `${scope}.users`,
    defaultMessage: 'Users',
  },
  login: {
    id: `${scope}.login`,
    defaultMessage: 'Login',
  },
  organizations: {
    id: `${scope}.organizations`,
    defaultMessage: 'Organisations',
  },
  allusers: {
    id: `${scope}.allusers`,
    defaultMessage: 'All Users',
  },
  resetpassword: {
    id: `${scope}.resetpassword`,
    defaultMessage: 'Reset Password',
  },
});
