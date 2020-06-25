import React, { Component } from 'react';
import TweenOne from 'rc-tween-one';
import { REDIRECT_URL } from 'utils/api';
import { Form, Select, Input, Button, Upload, Icon } from 'antd';
import Success from '../../images/success.png';
import history from '../../utils/history';
const { Option } = Select;

class BloodReportComponent extends React.Component {
  state = {
    fileList: [
      {
        uid: '-1',
        name: 'test.png',
        status: 'done',
        url: 'https://i.picsum.photos/id/866/200/300.jpg',
      },
    ],
  };

  handleChange = info => {
    let fileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-10);

    // 2. Read from response and show file link
    fileList = fileList.map(file => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    this.setState({ fileList });
  };

  render() {
    const props = {
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      onChange: this.handleChange,
      multiple: true,
    };

    return (
      <div className="bloodreport-wrapper">
        <Upload {...props} fileList={this.state.fileList}>
          <Button>
            <Icon type="upload" /> Upload
          </Button>
        </Upload>
      </div>
    );
  }
}

const BloodReport = Form.create({ name: 'bloodreport' })(BloodReportComponent);

export default BloodReport;
