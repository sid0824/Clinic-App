import React, { Component } from 'react';
import QueueAnim from 'rc-queue-anim';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Select, Form, Input, Button, Icon } from 'antd';
import './FindPatient.scss';
import Card from 'components/Card';
import {
  BLANK_ER,
  FIRST_NAME_ER,
  LAST_NAME_ER,
  EMAIL_ER,
  PHONE_ER,
} from '../../Validations/errors';

import auth from '../../utils/auth';
import history from '../../utils/history';
import logo from '../../images/hospital.png';

const { Option } = Select;
class FindPatientData extends React.Component {
  state = {
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

  render() {
    const { getFieldDecorator } = this.props.form;
    const { CloseForm, forgotpasswordevt, errorMsg } = this.props;

    return (
      <div className="pr-forms search-form">
        <Helmet
          titleTemplate="%s - Sample-Project"
          defaultTitle="Find Patient | Sample-Project"
        >
          <meta name="description" content="Sample-Project application" />
        </Helmet>
        <div className="login-form" style={{ borderRadius: '5px' }}>
          <div className="login-header login-header-left text-left">
            <h1>Find patient</h1>
            <a onClick={this.props.form_open} className="float-right">
              <Icon type="close" />
            </a>
          </div>
          <Form onSubmit={this.userLogin}>
            <div className="row find-patient">
              <div className="col-md-3" key="1">
                <Form.Item className="text-left">
                  {getFieldDecorator('first_name', {
                    rules: [
                      {
                        type: 'text',
                        message: FIRST_NAME_ER,
                      },
                    ],
                  })(<Input placeholder="First Name" />)}
                </Form.Item>
              </div>
              <div className="col-md-3" key="2">
                <Form.Item className="text-left">
                  {getFieldDecorator('last_name', {
                    rules: [
                      {
                        type: 'text',
                        message: LAST_NAME_ER,
                      },
                    ],
                  })(<Input placeholder="Last Name" />)}
                </Form.Item>
              </div>
              <div className="col-md-3" key="1">
                <Form.Item className="text-left">
                  {getFieldDecorator('email', {
                    rules: [
                      {
                        type: 'email',
                        message: EMAIL_ER,
                      },
                    ],
                  })(<Input placeholder="Email" />)}
                </Form.Item>
              </div>
              <div className="col-md-3" key="1">
                <Form.Item className="text-left">
                  {getFieldDecorator('phone')(
                    <Input placeholder="Phone Number" />,
                  )}
                </Form.Item>
              </div>
              <div className="col-md-3" key="1">
                <Form.Item className="text-left">
                  {getFieldDecorator('patient_number')(
                    <Input placeholder="Patient Number" />,
                  )}
                </Form.Item>
              </div>
              <div className="col-md-3" key="1">
                <Form.Item className="text-left">
                  {getFieldDecorator('date_of_birth')(
                    <Input placeholder="Date Of Birth" />,
                  )}
                </Form.Item>
              </div>

              <div className="col-md-3" key="1">
                <Form.Item className="text-left">
                  {getFieldDecorator('aadhar_number')(
                    <Input placeholder="Aadhar Number" />,
                  )}
                </Form.Item>
              </div>
              <div className="col-md-3" key="1">
                <div className="row">
                  <div className="col-md-6">
                    {' '}
                    <Form.Item className="text-left">
                      {getFieldDecorator('gender')(
                        <Input placeholder="Gender" />,
                      )}
                    </Form.Item>
                  </div>
                  <div className="col-md-6">
                    <Form.Item className="form-btn">
                      <Button
                        className="cl-fill btn-h-40 btn-login"
                        type="primary"
                        htmlType="submit"
                      >
                        Find
                      </Button>
                    </Form.Item>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

const FindPatient = Form.create({ name: 'coordinated' })(FindPatientData);

export default FindPatient;
