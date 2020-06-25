import React, { Component } from 'react';
import QueueAnim from 'rc-queue-anim';
import { Select, Form, Input, Button } from 'antd';
import './ForgottenPassword.scss';
import history from '../../utils/history';

const { Option } = Select;
class ForgottenPasswordData extends React.Component {
  state = {
    formType: 'forgot-password',
  };

  forgotPassword = e => {
    e.preventDefault();
    // this.props.validatedUserData();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.sendemailevt(values);
      } else {
        console.log(err);
      }
    });
  };

  backToLoginFn = () => {
    this.props.backToLogin();
  };

  // componentDidMount() {
  //   const { formType } = this.state;
  //   this.props.callback(formType);
  // }

  // onChange = e => {
  //     const { value } = e.target;
  //     const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
  //     if ((!Number.isNaN(value) && reg.test(value)) || value === '' || value === '-') {
  //       this.props.onChange(value);
  //     }
  //   };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { CloseForm } = this.props;
    return (
      <div className="pr-forms lg-form">
        <div className="secure-brand-logo">
          <h3>Forgotten your password?</h3>
          <p>
            To reset your password, enter the email address you use to login to
            Xero. A link will be emailed to this address which will let you
            reset your password.
          </p>
        </div>
        {/* <div className="login-header text-center">
          <h1 className="text-center">Forgotten Password</h1>
        </div> */}
        <div className="pr-login-box">
          <Form onSubmit={this.forgotPassword}>
            <QueueAnim
              type={['right', 'left']}
              interval={[100, 200]}
              delay={[0, 500]}
            >
              <div key="1">
                <Form.Item className="text-left">
                  <label>Email</label>
                  {getFieldDecorator('email', {
                    rules: [
                      {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                      },
                      {
                        required: true,
                        message: 'Please input your E-mail!',
                      },
                    ],
                  })(<Input placeholder="Email" />)}
                </Form.Item>
                <Form.Item className="form-btn">
                  <Button
                    className="cl-fill btn-h-40 btn-login"
                    type="primary"
                    htmlType="submit"
                  >
                    Reset Password
                  </Button>
                </Form.Item>
              </div>
            </QueueAnim>
          </Form>
          <div className="footer-links">
            {/* <Link to="/forgot-password" > Contact us </Link> */}
            <a onClick={this.backToLoginFn} className="forgot-pwd-link">
              Back to Login
            </a>
          </div>
        </div>
      </div>
    );
  }
}

const ForgottenPassword = Form.create({ name: 'coordinated' })(
  ForgottenPasswordData,
);

export default ForgottenPassword;
