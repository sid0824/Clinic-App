/* eslint-disable indent */
/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import QueueAnim from 'rc-queue-anim';
import { Helmet } from 'react-helmet';
import { Form, Input, Button, Popover, List, Badge } from 'antd';
import Card from 'components/Card';
import './ResetPassword.scss';

class ResetPasswordData extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    popOverVisible: false,
    valNumber: false,
    valLowercase: false,
    valUppercase: false,
    valEitDigits: false,
    newpassword: '',
    validPasword: false,
    valSpecialChar: false,
  };

  openNotificationWithIcon = type => {
    notification[type]({
      message: 'Updated fields required!',
    });
  };

  backToLoginFn = () => {
    this.props.backToLogin();
  };

  userPasswordDetails = e => {
    e.preventDefault();
    const { isFieldsTouched } = this.props.form;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {
          valNumber,
          valLowercase,
          valUppercase,
          valEitDigits,
          newpassword,
          valSpecialChar,
        } = this.state;

        if (
          isFieldsTouched() &&
          valNumber &&
          valLowercase &&
          valUppercase &&
          valEitDigits &&
          valSpecialChar
        ) {
          console.log(values);
          this.props.resetUserPasswordEvt(values);
          this.setState({
            popOverVisible: false,
          });
        } else {
          this.openNotificationWithIcon('warning');
        }
      } else {
        console.log(err);
        this.setState({
          popOverVisible: true,
        });
      }
    });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Password must match new password');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    this.setState({
      popOverVisible: true,
    });

    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm_password'], { force: true });
    }

    // eslint-disable-next-line no-unused-expressions
    value.length < 8
      ? [
          this.setState({
            valEitDigits: false,
          }),
          callback(''),
        ]
      : [
          this.setState({
            valEitDigits: true,
          }),
          callback(),
        ];

    value.search(/[0-9]/) < 0
      ? [
          this.setState({
            valNumber: false,
          }),
          callback(''),
        ]
      : [
          this.setState({
            valNumber: true,
          }),
          callback(),
        ];

    value.search(/[a-z]/) < 0
      ? [
          this.setState({
            valLowercase: false,
          }),
          callback(''),
        ]
      : [
          this.setState({
            valLowercase: true,
          }),
          callback(),
        ];

    value.search(/[A-Z]/) < 0
      ? [
          this.setState({
            valUppercase: false,
          }),
          callback(''),
        ]
      : [
          this.setState({
            valUppercase: true,
          }),
          callback(),
        ];

    value.search(/[!@#$%^&*]/) < 0
      ? [
          this.setState({
            valSpecialChar: false,
          }),
          callback(''),
        ]
      : [
          this.setState({
            valSpecialChar: true,
          }),
          callback(),
        ];

    callback();
  };

  handlePasswordBlur = e => {
    const { value } = e.target;
    this.setState({
      popOverVisible: false,
      newpassword: value,
    });
  };

  render() {
    const { getFieldDecorator, isFieldsTouched } = this.props.form;
    const {
      valEitDigits,
      valLowercase,
      valNumber,
      valUppercase,
      valSpecialChar,
    } = this.state;
    const content = (
      <div>
        <List className="pr-validate-pop">
          <List.Item>Your password must contain at least</List.Item>
          <List.Item>
            <Badge status={valLowercase ? 'success' : 'error'} />
            One lowercase
          </List.Item>
          <List.Item>
            <Badge status={valUppercase ? 'success' : 'error'} />
            One uppercase
          </List.Item>
          <List.Item>
            <Badge status={valNumber ? 'success' : 'error'} />
            One number
          </List.Item>
          <List.Item>
            <Badge status={valEitDigits ? 'success' : 'error'} /> 8 digits
          </List.Item>
          <List.Item>
            <Badge status={valSpecialChar ? 'success' : 'error'} /> One special
            character
          </List.Item>
        </List>
      </div>
    );

    return (
      <div>
        <Helmet
          titleTemplate="%s - "
          defaultTitle="Reset Password | Sample-app"
        >
          <meta name="description" content="sample application" />
        </Helmet>
        <div className="pr-forms lg-form">
          <div className="secure-brand-logo">
            <h3>Reset your password</h3>
            <p>
              <strong>
                Your password should be difficult for others to guess.
              </strong>
            </p>
            <p>
              We recommend that you use a combination of upper case and lower
              case letters as well as numbers.
            </p>
          </div>

          {/* <div className="login-header text-center">
            <h1>Reset Password</h1>
          </div> */}

          <div className="pr-login-box">
            <QueueAnim
              type={['right', 'left']}
              interval={[100, 200]}
              delay={[0, 500]}
            >
              <Form>
                <Form.Item>
                  <label>New password</label>
                  {getFieldDecorator('password', {
                    rules: [
                      {
                        required: true,
                        message: 'Please enter new password',
                      },
                      {
                        validator: this.validateToNextPassword,
                      },
                    ],
                  })(
                    <div>
                      <Popover
                        visible={this.state.popOverVisible}
                        placement="topLeft"
                        content={content}
                      />
                      <Input.Password
                        onBlur={this.handlePasswordBlur}
                        placeholder="New password"
                      />
                    </div>,
                  )}
                </Form.Item>
                <Form.Item>
                  <label>Confirm new password</label>
                  {getFieldDecorator('confirm_password', {
                    rules: [
                      {
                        required: true,
                        message: 'Please enter confirm new password',
                      },
                      {
                        validator: this.compareToFirstPassword,
                      },
                    ],
                  })(
                    <Input.Password
                      // onChange={this.handleConfirmBlur}
                      placeholder="Confirm new password"
                    />,
                  )}
                </Form.Item>
              </Form>
              <Form.Item key="6" className="form-btn">
                <Button
                  onClick={this.userPasswordDetails}
                  className="cl-fill btn-login"
                  type="primary"
                  htmlType="submit"
                >
                  Save
                </Button>
              </Form.Item>
              <div className="footer-links">
                {/* <Link to="/forgot-password" > Contact us </Link> */}
                <a onClick={this.backToLoginFn} className="forgot-pwd-link">
                  Back to Login
                </a>
              </div>
            </QueueAnim>
          </div>
        </div>
      </div>
    );
  }
}

const ResetPassword = Form.create({ name: 'reset-password' })(
  ResetPasswordData,
);

export default ResetPassword;
