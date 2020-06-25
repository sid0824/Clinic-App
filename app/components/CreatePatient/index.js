import React, { Component } from 'react';
import QueueAnim from 'rc-queue-anim';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Select, Form, Input, Button, DatePicker } from 'antd';
import './CreatePatient.scss';
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
class CreatePatientData extends React.Component {
  state = {
    formType: 'add-patient',
  };

  createPatientFn = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        // Should format date value before submit.
        const fieldsValues = {
          ...values,
          dob: values.dob.format('YYYY-MM-DD'),
        };
        console.log('Received values from form: ', fieldsValues);
        const data = {
          user: {
            first_name: fieldsValues.first_name,
            last_name: fieldsValues.last_name,
            email: fieldsValues.email,
          },
          phone: fieldsValues.phone,
          gender: fieldsValues.gender,
          dob: fieldsValues.dob,
          identity_number: fieldsValues.identity_number,
        };
        console.log(data);
        this.props.patientData(data);
      } else {
        console.log(err);
      }
    });
  };

  cancelCreatePatientHn = e => {
    this.props.cancelCreatePatient();
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 4,
        },
      },
    };

    return (
      <div className="search-form">
        <div className="login-form" style={{ borderRadius: '5px' }}>
          <div className="login-header login-header-left text-left">
            <h1>Patient Information</h1>
          </div>
          <div className="pr-login-box">
            <Form
              {...formItemLayout}
              onSubmit={this.createPatientFn}
              className="login-form"
            >
              <Form.Item label="First Name">
                {getFieldDecorator('first_name', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your First Name!',
                    },
                  ],
                })(<Input />)}
              </Form.Item>
              <Form.Item label="Last Name">
                {getFieldDecorator('last_name', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your Last Name!',
                    },
                  ],
                })(<Input />)}
              </Form.Item>
              <Form.Item label="E-mail">
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
                })(<Input />)}
              </Form.Item>
              <Form.Item label="Phone Number">
                {getFieldDecorator('phone', {
                  rules: [{ required: false }],
                })(<Input style={{ width: '100%' }} />)}
              </Form.Item>
              <Form.Item label="Date of birth">
                {getFieldDecorator('dob', {
                  rules: [
                    {
                      type: 'object',
                      required: true,
                      message: 'Please select date!',
                    },
                  ],
                })(<DatePicker />)}
              </Form.Item>
              <Form.Item label="Gender">
                {getFieldDecorator('gender', {
                  rules: [
                    {
                      required: true,
                      message: 'Please select your gender!',
                    },
                  ],
                })(
                  <Select placeholder="Select a option">
                    <Option value="Male">Male</Option>
                    <Option value="Female">Female</Option>
                  </Select>,
                )}
              </Form.Item>
              <Form.Item label="Aadhar Number">
                {getFieldDecorator('identity_number', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your Aadhar Number!',
                    },
                  ],
                })(<Input />)}
              </Form.Item>
              <div className="row">
                <div className="col-md-12 text-right">
                  <Form.Item {...tailFormItemLayout} className="form-btn">
                    <Button
                      className="cl-clone"
                      type="button"
                      onClick={this.cancelCreatePatientHn}
                      style={{ marginRight: '15px' }}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="cl-fill btn-h-40 btn-save float-right"
                      type="primary"
                      htmlType="submit"
                    >
                      save
                    </Button>
                  </Form.Item>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

const CreatePatient = Form.create({ name: 'coordinated' })(CreatePatientData);

export default CreatePatient;
