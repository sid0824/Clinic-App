/* eslint-disable no-unused-expressions */
import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { get, map, replace } from 'lodash';

// Utils
import Login from 'components/Login';
import ForgottenPassword from 'components/ForgottenPassword';
import ResetPassword from 'components/ResetPassword';
// import injectSaga from 'utils/injectSaga';
// import injectReducer from 'utils/injectReducer';

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';

import {
  loginSubmit,
  loginError,
  onChange,
  setForm,
  forgotSubmit,
  updateResetPassword,
  reqForgotPassword,
} from './actions';

// import form from './form.json';

import makeSelectAuthPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import history from '../../utils/history';
import './Auth.scss';

export class Auth extends React.Component {
  state = {
    isLoginComponent: true,
    isResetPasswordComponent: false,
    isChangePasswordComponent: false,
    formType: '',
  };

  goToForgotPassword = () => {
    this.setState({
      isLoginComponent: false,
      isChangePasswordComponent: true,
    });
    history.push('/forgot-password');
  };

  backToLoginFn = () => {
    this.setState({
      isLoginComponent: true,
      isResetPasswordComponent: false,
      isChangePasswordComponent: false,
    });
    history.push('/login');
  };

  submitLogin = val => {
    this.props.loginSubmit(val);
  };

  submitForgotPassword = val => {
    this.props.reqForgotPassword(val);
  };

  getFormType = data => {
    this.setState({
      formType: data,
    });
    this.props.setForm(this.state.formType);
  };

  updateResetPasswordFn = resetdata => {
    const urlString = window.location; // window.location.href
    const url = new URL(urlString);
    const token = url.searchParams.get('token');
    const id = url.searchParams.get('id');
    // const token = 'bZ61OzyAoxr37F1xDV1N8YhFVX4';

    const data = Object.assign(resetdata, {
      token,
      id,
    });

    this.props.updateResetPassword(data);
  };

  componentWillMount() {
    const locationPath = window.location.pathname;
    locationPath === '/reset-password'
      ? [
        this.setState({
          isLoginComponent: false,
          isChangePasswordComponent: false,
          isResetPasswordComponent: true,
        }),
      ]
      : '';
  }

  render() {
    console.log(this.state);
    return (
      <div className="container pr-auth-wrapper">
        <div className="row justify-content-md-center">
          <div className="col-md-6 col-sm-12 col-xs-12">
            {this.state.isLoginComponent ? (
              <Login
                // errorMsg={this.props.loginError}
                callback={this.getFormType}
                submitformev={this.submitLogin}
                forgotpasswordevt={this.goToForgotPassword}
              />
            ) : (
              ''
            )}
            {this.state.isChangePasswordComponent ? (
              <ForgottenPassword
                callback={this.getFormType}
                sendemailevt={this.submitForgotPassword}
                backToLogin={this.backToLoginFn}
              />
            ) : (
              ''
            )}
            {this.state.isResetPasswordComponent ? (
              <ResetPassword
                backToLogin={this.backToLoginFn}
                resetUserPasswordEvt={this.updateResetPasswordFn}
              />
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    );
  }
}
Auth.propTypes = {
  // formType: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // match: PropTypes.func.isRequired,
  // onChange: PropTypes.func.isRequired,
  setForm: PropTypes.func.isRequired,
  loginSubmit: PropTypes.func.isRequired,
  reqForgotPassword: PropTypes.func.isRequired,
  // loginError: PropTypes.func.isRequired,
};

// const mapDispatchToProps = dispatch => ({
//   loginSubmit: () => {
//     // if (evt !== undefined && evt.preventDefault) evt.preventDefault();
//     dispatch(loginSubmit());
//   },
// });
const mapStateToProps = makeSelectAuthPage();

// const mapDispatchToProps = {
//   loadCurrentUser: loadCurrentUserAction,
// };

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      // onChange,
      setForm,
      loginSubmit,
      loginError,
      reqForgotPassword,
      updateResetPassword,
    },
    dispatch,
  );
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'auth', reducer });
const withSaga = injectSaga({ key: 'auth', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Auth);
