import React from 'react';
import { Form, Input, Button, Icon } from 'antd';
import './ViewPrescription.scss';
import { Helmet } from 'react-helmet';

const { TextArea } = Input;

class ViewPrescriptionFormData extends React.Component {
  state = {
    prescriptionItems: [],
  };

  handleChange(e, index) {
    this.state.prescriptionItems[index] = e.target.value;
  }

  handleRemove(index) {
    // remove ana item at the index
    this.state.prescriptionItems.splice(index, 1);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
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
      <div className="comp-wrap">
        <Helmet
          titleTemplate="%s - Sample-App"
          defaultTitle="View Prescription | Sample-App"
        >
          <meta name="description" content="sample application" />
        </Helmet>
        <div className="component-title">
          <div className="container">
            <h1>View Prescription</h1>
          </div>
        </div>
        <div className="container">
          <div className="cards-wrap row justify-content-md-center">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="prescription-form">
                <div className="login-form" style={{ borderRadius: '5px' }}>
                  <div className="pr-login-box">
                    <Form onSubmit={this.handleSubmit}>
                      {this.state.prescriptionItems.map((item, index) => (
                        <div className="new-item" key={index} id={index}>
                          <Form.Item label="" className="">
                            {getFieldDecorator('', {})}
                          </Form.Item>
                          <Form.Item>{getFieldDecorator('', {})()}</Form.Item>
                          <Form.Item
                            label=""
                            className=""
                            style={{ width: '15%' }}
                          >
                            {getFieldDecorator('', {})}
                          </Form.Item>
                          <Form.Item
                            label=""
                            className=""
                            style={{ width: '15%' }}
                          >
                            {getFieldDecorator('', {})}
                          </Form.Item>
                          <Form.Item label="" className="">
                            {getFieldDecorator('', {})}
                          </Form.Item>
                          <Form.Item>
                            {getFieldDecorator('')(<TextArea rows={3} />)}
                          </Form.Item>
                          {/* <input onChange={(e) => this.handleChange(e, index)} value={item}></input> */}
                          <a
                            className="remove"
                            onClick={() => this.handleRemove(index)}
                          >
                            <Icon type="close-circle" />
                          </a>
                        </div>
                      ))}
                      <Button
                        onClick={e => this.addprescriptionItem(e)}
                        className="btn"
                        type="primary"
                      >
                        Summary
                      </Button>

                      <Form.Item {...tailFormItemLayout} className="form-btn">
                        <Button
                          className="cl-clone"
                          type="button"
                          htmlType="button"
                        >
                          Cancel
                        </Button>
                        <Button
                          className="cl-fill btn-h-40 btn-save float-right"
                          type="primary"
                          htmlType="submit"
                        >
                          Save
                        </Button>
                      </Form.Item>
                    </Form>
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

const ViewPrescription = Form.create({ name: 'coordinated' })(
  ViewPrescriptionFormData,
);

export default ViewPrescription;
