import React, { Component } from 'react';
import TweenOne from 'rc-tween-one';
import { REDIRECT_URL } from 'utils/api';
import { Form, Select, Input, Button, InputNumber } from 'antd';
import Success from '../../images/success.png';
import history from '../../utils/history';
const { Option } = Select;

class VitalsComponent extends React.Component {
  state = {
    vitalData: {},
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.setState({
          vitalData: values,
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { number } = this.state;
    return (
      <div className="vitals-wrapper">
        <Form
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
          onSubmit={this.handleSubmit}
        >
          {/* <Form.Item
            label="height"
            // validateStatus={number.validateStatus}
            // help={number.errorMsg || tips}
          >
            <InputNumber
              // min={8}
              // max={12}
              value={number.value}
              onChange={this.handleNumberChange}
            />
          </Form.Item> */}

          <Form.Item label="Height">
            {getFieldDecorator('height', {
              rules: [{ required: true, message: 'Please input your height!' }],
            })(
              <Input
                type="number"
                // min={8}
                // max={12}
              />,
            )}
          </Form.Item>

          <Form.Item label="Weight">
            {getFieldDecorator('Weight', {
              rules: [{ required: true, message: 'Please input your Weight!' }],
            })(
              <Input
                type="number"
                // min={8}
                // max={12}
              />,
            )}
          </Form.Item>

          <Form.Item label="Pulse">
            {getFieldDecorator('pulse', {
              rules: [{ required: true, message: 'Please input your pulse!' }],
            })(
              <Input
                type="number"
                // min={8}
                // max={12}
              />,
            )}
          </Form.Item>

          <Form.Item label="Bp">
            {getFieldDecorator('bp', {
              rules: [{ required: true, message: 'Please input your bp!' }],
            })(
              <Input
                type="number"
                // min={8}
                // max={12}
              />,
            )}
          </Form.Item>

          <Form.Item wrapperCol={{ span: 5, offset: 13 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const Vitals = Form.create({ name: 'coordinated' })(VitalsComponent);

export default Vitals;
