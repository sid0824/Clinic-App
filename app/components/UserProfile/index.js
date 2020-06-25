import React, { Component } from 'react';
import QueueAnim from 'rc-queue-anim';

import Card from 'components/Card';
// import CompanyDetails from 'components/CompanyDetails';
import { Form, Input, Button, Select, DatePicker, Icon, Upload } from 'antd';
import moment from 'moment';
// import ChangePassword from '../ChangePassword';
import LoadingIndicator from '../LoadingIndicator';

import { FULL_NAME_ER, EMAIL_ER } from '../../Validations/errors';

const { Option } = Select;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

class UserProfileData extends React.Component {
  state = {
    loading: false,
    disable: true,
  };

  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  }

  onValuesChange(_, values) {
    console.log(values);
  }

  userDetails = e => {
    e.preventDefault();

    const { isFieldsTouched } = this.props.form;

    this.props.form.validateFields((err, values) => {
      if (!err) {
        const fieldsValues = {
          ...values,
          dob: values.dob.format('YYYY-MM-DD'),
        };
        console.log('Received values from form: ', fieldsValues);
        const data = {
          code: this.props.show_user_details.code,
          user: {
            first_name: fieldsValues.first_name,
            last_name: fieldsValues.last_name,
          },
          user_detail: {
            phone: fieldsValues.phone,
            profile_image: null,
          },
          gender: fieldsValues.gender,
          dob: fieldsValues.dob,
          identity_number: fieldsValues.identity_number,
        };
        // console.log(values, this.props.show_user_details);
        console.log(data);
        this.props.updateUserDetailsEvt(data);
      }
    });
  };

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  handleEdit = e => {
    e.preventDefault();
    this.setState({ disable: false });
  };

  handleCancel = e => {
    e.preventDefault();
    this.setState({ disable: true });
  };

  renderUserDetailform = initialVal => {
    const dateFormat = 'YYYY-MM-DD';
    const {
      getFieldDecorator,
      isFieldsTouched,
      getFieldValue,
    } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
    };
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;
    return (
      <div className="pr-tabs-wrapper pr-forms">
        <Form {...formItemLayout} onSubmit={this.userDetails}>
          <Card className="text-left">
            <h2 style={{ display: 'inline-block' }}>Personal Details</h2>
            <Button
              onClick={this.handleEdit}
              className="cl-fill btn-h-40 btn-save float-right"
              type="primary"
              htmlType="button"
            >
              Edit
            </Button>

            {/* <Form.Item label="Profile image">
              {getFieldDecorator('name')(
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload={beforeUpload}
                  onChange={this.handleChange}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="avatar"
                      style={{ width: '100%' }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>,
              )}
            </Form.Item> */}

            <Form.Item label="First Name">
              {getFieldDecorator('first_name', {
                initialValue: initialVal.user.first_name,
                rules: [
                  {
                    required: true,
                    message: 'Please enter first name',
                  },
                  {
                    pattern: new RegExp("^[A-Za-z _!'$@./#&+-]*$"),
                    message: 'Name cannot have numbers',
                  },
                ],
              })(
                <Input
                  disabled={this.state.disable}
                  placeholder="First name"
                />,
              )}
            </Form.Item>
            <Form.Item label="Last Name">
              {getFieldDecorator('last_name', {
                initialValue: initialVal.user.last_name,
                rules: [
                  {
                    required: true,
                    message: 'Please enter last name',
                  },
                  {
                    pattern: new RegExp("^[A-Za-z _!'$@./#&+-]*$"),
                    message: 'Name cannot have numbers',
                  },
                ],
              })(
                <Input disabled={this.state.disable} placeholder="Last name" />,
              )}
            </Form.Item>
            <Form.Item label="E-mail">
              {getFieldDecorator('email', {
                initialValue: initialVal.user.email,
                rules: [
                  {
                    type: 'email',
                    message: 'Email is unique identifier',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ],
              })(<Input disabled placeholder="Email" />)}
            </Form.Item>
            <Form.Item label="Phone Number">
              {getFieldDecorator('phone', {
                initialValue: initialVal.user_detail.phone,
                rules: [{ required: false }],
              })(
                <Input
                  disabled={this.state.disable}
                  style={{ width: '100%' }}
                />,
              )}
            </Form.Item>
            <Form.Item label="Date of birth">
              {getFieldDecorator('dob', {
                initialValue: moment(initialVal.dob),
                rules: [
                  {
                    type: 'object',
                    required: true,
                    message: 'Please select date!',
                  },
                ],
              })(
                <DatePicker
                  disabled={this.state.disable}
                  format={dateFormat}
                />,
              )}
            </Form.Item>
            <Form.Item label="Gender">
              {getFieldDecorator('gender', {
                initialValue: initialVal.gender,
                rules: [
                  {
                    required: true,
                    message: 'Please select your gender!',
                  },
                ],
              })(
                <Select
                  disabled={this.state.disable}
                  placeholder="Select a option"
                >
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                </Select>,
              )}
            </Form.Item>
            <Form.Item label="Aadhar Number">
              {getFieldDecorator('identity_number', {
                initialValue: initialVal.identity_number,
                rules: [
                  {
                    required: true,
                    message: 'Please input your Aadhar Number!',
                  },
                ],
              })(<Input disabled={this.state.disable} />)}
            </Form.Item>

            {/* <Card className="text-left">
            <ChangePassword />
          </Card> */}
            <div className="row text-right">
              <div className="col-md-12 ">
                <Form.Item key="6">
                  <Button
                    style={{ marginRight: '15px' }}
                    className="cl-clone"
                    type="button"
                    onClick={this.handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={this.userDetails}
                    // disabled={!isFieldsTouched()}
                    className="cl-fill btn-h-40 btn-save"
                    type="primary"
                    htmlType="submit"
                  >
                    Update
                  </Button>
                </Form.Item>
              </div>
            </div>
          </Card>
        </Form>
      </div>
    );
  };

  newUserCompModal = () => false;

  render() {
    const { getFieldDecorator } = this.props.form;
    const { show_user_details } = this.props;

    if (!this.props.show_user_details) {
      return <div>Loading...</div>;
    }

    return <div>{this.renderUserDetailform(show_user_details)}</div>;
  }
}

const UserProfile = Form.create({ name: 'userprofiledata' })(UserProfileData);

export default UserProfile;
