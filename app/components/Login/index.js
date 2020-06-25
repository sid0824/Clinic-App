import React, { Component } from 'react';
import QueueAnim from 'rc-queue-anim';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Select, Form, Input, Button } from 'antd';
import './Login.scss';
import Card from 'components/Card';
import { BLANK_ER, EMAIL_ER } from '../../Validations/errors';

import auth from '../../utils/auth';
import history from '../../utils/history';
import logo from '../../images/hospital.png';

const { Option } = Select;
class LoginData extends React.Component {
  state = {
    isLogedIn: false,
    formType: 'login',
  };

  userLogin = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.submitformev(values);
      } else {
        console.log(err);
      }
    });
  };

  // componentDidMount() {
  //   const { formType } = this.state;
  //   this.props.callback(formType);
  // }

  componentWillMount() {
    console.log('users');
    if (auth.getToken()) {
      this.setState({
        isLogedIn: true,
      });
    }
  }

  forgotPassword = e => {
    e.preventDefault();
    this.props.forgotpasswordevt(e);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { CloseForm, forgotpasswordevt, errorMsg } = this.props;
    if (this.state.isLogedIn) history.push('/dashboard');

    return (
      <div className="pr-forms lg-form">
        {/* <Helmet
          titleTemplate="%s - Sample-Project"
          defaultTitle="Login | Sample-Project"
        >
          <meta name="description" content="Sample-Project application" />
        </Helmet> */}
        <div>
          <div className="row justify-content-md-center">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div
                className="login-form"
                style={{ background: '#00a2d5', borderRadius: '5px' }}
              >
                <div className="login-header login-header-left text-center">
                  <h1>Welcome to Sample-app</h1>
                </div>
                <div className="pr-login-box">
                  <div className="error-message alert alert-danger">
                    {errorMsg} Wrong email or password.
                  </div>
                  <Form onSubmit={this.userLogin}>
                    <div key="1">
                      <Form.Item className="text-left">
                        {/* <label>Email</label> */}
                        {getFieldDecorator('email', {
                          rules: [
                            {
                              required: true,
                              message: BLANK_ER,
                            },
                            {
                              type: 'email',
                              message: EMAIL_ER,
                            },
                          ],
                        })(<Input placeholder="Email" />)}
                      </Form.Item>
                      <Form.Item className="text-left">
                        {/* <label>Password</label> */}
                        {getFieldDecorator('password', {
                          rules: [
                            {
                              required: true,
                              message: BLANK_ER,
                            },
                          ],
                        })(<Input type="password" placeholder="Password" />)}
                        {/* <div className="forgot-pwd">
                          <Button className="cl-none btn-h-36">
                            Forgotten password?{' '}
                          </Button>
                        </div> */}
                      </Form.Item>
                      <Form.Item className="form-btn">
                        <Button
                          className="cl-fill btn-h-40 btn-login"
                          type="primary"
                          htmlType="submit"
                        >
                          Log in
                        </Button>
                      </Form.Item>
                    </div>
                  </Form>
                  <div className="footer-links">
                    {/* <Link to="/forgot-password" > Contact us </Link> */}
                    <a
                      onClick={this.forgotPassword}
                      className="forgot-pwd-link"
                    >
                      Forgot Password?
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const Login = Form.create({ name: 'coordinated' })(LoginData);

export default Login;
