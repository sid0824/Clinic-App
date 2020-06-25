import React, { Component } from 'react';
import QueueAnim from 'rc-queue-anim';
import { Form, Input, Button, Radio, Upload, Icon } from 'antd';
import Card from 'components/Card';

import './Settings.scss';

const props = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

class SettingsData extends React.Component {
  state = {
    value: 'primary-theme',
  };

  onThemeChange = e => {
    e.preventDefault();
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="pr-tabs-wrapper pr-settings pr-forms">
        <Card className="text-left">
          <h2>Customize Sample App to reflect your brand</h2>

          <Form onSubmit={this.createUser}>
            <QueueAnim
              type={['right', 'left']}
              interval={[100, 200]}
              delay={[0, 500]}
            >
              >
              <Form.Item key="1">
                <label>Brand name</label>
                {getFieldDecorator('brandname', {
                  rules: [
                    {
                      required: true,
                      message: 'Please enter first name',
                    },
                  ],
                })(<Input placeholder="Brand name" />)}
              </Form.Item>
              <Form.Item key="1">
                <label>Upload file</label>

                <Upload {...props}>
                  <div className="row">
                    <div className="col-md-9">
                      <Input placeholder="Upload file" />
                    </div>
                    <div className="col-md-3">
                      <Button type="primary" className="cl-border ">
                        Upload
                      </Button>
                    </div>
                  </div>
                </Upload>
              </Form.Item>
            </QueueAnim>
          </Form>

          <div>
            <h3> Color scheme </h3>
            <Radio.Group onChange={this.onThemeChange} value={this.state.value}>
              <Radio value="primary-theme">
                <div className="pr-theme">
                  <div className="theme-group-a">
                    <span style={{ backgroundColor: '#84BD00' }} />
                    <span style={{ backgroundColor: '#64BD00' }} />
                    <span style={{ backgroundColor: '#444660' }} />
                  </div>
                  <div className="theme-group-b">
                    <span style={{ backgroundColor: '#93E79E' }} />
                    <span style={{ backgroundColor: '#84BD00' }} />
                    <span style={{ backgroundColor: '#26A235' }} />
                    <span style={{ backgroundColor: '#444660' }} />
                  </div>
                </div>
              </Radio>
              <Radio value="secondary-theme">
                <div className="pr-theme">
                  <div className="theme-group-a">
                    <span style={{ backgroundColor: '#D38400' }} />
                    <span style={{ backgroundColor: '#E89000' }} />
                    <span style={{ backgroundColor: '#444660' }} />
                  </div>
                  <div className="theme-group-b">
                    <span style={{ backgroundColor: '#FFCD7A' }} />
                    <span style={{ backgroundColor: '#F57623' }} />
                    <span style={{ backgroundColor: '#E84800' }} />
                    <span style={{ backgroundColor: '#444660' }} />
                  </div>
                </div>
              </Radio>
              <Radio value="dimple-blue">
                <div className="pr-theme">
                  <div className="theme-group-a">
                    <span style={{ backgroundColor: '#387CCC' }} />
                    <span style={{ backgroundColor: '#385DDD' }} />
                    <span style={{ backgroundColor: '#444660' }} />
                  </div>
                  <div className="theme-group-b">
                    <span style={{ backgroundColor: '#93C4FF' }} />
                    <span style={{ backgroundColor: '#796FE3' }} />
                    <span style={{ backgroundColor: '#2B61A0' }} />
                    <span style={{ backgroundColor: '#444660' }} />
                  </div>
                </div>
              </Radio>
              <Radio value="cute-berry">
                <div className="pr-theme">
                  <div className="theme-group-a">
                    <span style={{ backgroundColor: '#AC0C7B' }} />
                    <span style={{ backgroundColor: '#C90F90' }} />
                    <span style={{ backgroundColor: '#444660' }} />
                  </div>
                  <div className="theme-group-b">
                    <span style={{ backgroundColor: '#FFA9E5' }} />
                    <span style={{ backgroundColor: '#D215BB' }} />
                    <span style={{ backgroundColor: '#AC0C7B' }} />
                    <span style={{ backgroundColor: '#444660' }} />
                  </div>
                </div>
              </Radio>

              <Radio value="smart-red">
                <div className="pr-theme">
                  <div className="theme-group-a">
                    <span style={{ backgroundColor: '#CC385E' }} />
                    <span style={{ backgroundColor: '#EA3A68' }} />
                    <span style={{ backgroundColor: '#444660' }} />
                  </div>
                  <div className="theme-group-b">
                    <span style={{ backgroundColor: '#FFB3C7' }} />
                    <span style={{ backgroundColor: '#E1859D' }} />
                    <span style={{ backgroundColor: '#CA2562' }} />
                    <span style={{ backgroundColor: '#444660' }} />
                  </div>
                </div>
              </Radio>
            </Radio.Group>
          </div>
        </Card>
        <br />
        <Form.Item key="4">
          <Button className="cl-fill" type="primary" htmlType="submit">
            Update
          </Button>

          <Button className="cl-none" type="primary" htmlType="submit">
            Cancel
          </Button>
        </Form.Item>
      </div>
    );
  }
}

const Settings = Form.create({ name: 'coordinated' })(SettingsData);

export default Settings;
