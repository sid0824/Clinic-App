import React, { Component } from 'react';
import { Select, Form, Input, Button, DatePicker, Icon } from 'antd';
import './CreateCompoundPrescription.scss';
import { Helmet } from 'react-helmet';

const { Option } = Select;
const { TextArea } = Input;

class CreatePrescriptionFormData extends React.Component {
  state = {
    formType: 'add-patient',
    prescriptionItems: [],
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }

      // Should format date value before submit.
      const fieldsValues = {
        ...values,
        'date-picker': values['date-picker'].format('DD-MM-YYYY'),
      };
      console.log('Received values of form: ', fieldsValues);
    });
  };

  addprescriptionItems() {
    this.setState({ prescriptionItems: [...this.state.prescriptionItems, ''] });
    console.log({ prescriptionItems: [...this.state.prescriptionItems, ''] });
  }

  handleChange(e, index) {
    this.state.prescriptionItems[index] = e.target.value;

    // set the changed state
    this.setState({ prescriptionItems: this.state.prescriptionItems });
  }

  handleRemove(index) {
    // remove ana item at the index
    this.state.prescriptionItems.splice(index, 1);

    console.log(this.state.prescriptionItems, '$$$$');

    // update the state
    this.setState({ prescriptionItems: this.state.prescriptionItems });
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
          defaultTitle="Create Prescription | Sample-App"
        >
          <meta name="description" content="sample application" />
        </Helmet>
        <div className="component-title">
          <div className="container">
            <h1>Add Prescription</h1>
          </div>
        </div>
        <Button
          onClick={e => this.addprescriptionItems(e)}
          className="btn"
          type="primary"
        >
          Upload Blood Report
        </Button>
        <Button
          onClick={e => this.addprescriptionItems(e)}
          className="btn"
          type="primary"
        >
          Add Vitals
        </Button>
        <div className="container">
          <div className="cards-wrap row justify-content-md-center">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="prescription-form">
                <div className="login-form" style={{ borderRadius: '5px' }}>
                  <div className="pr-login-box">
                    <Form onSubmit={this.handleSubmit}>
                      <div>
                        <Form.Item label="Start" className="prescription_date">
                          {getFieldDecorator('start', {
                            rules: [
                              {
                                type: 'object',
                                required: true,
                                message: 'Please select date!',
                              },
                            ],
                          })(<DatePicker />)}
                        </Form.Item>
                        <Form.Item label="End" className="prescription_date">
                          {getFieldDecorator('end', {
                            rules: [
                              {
                                type: 'object',
                                required: true,
                                message: 'Please select date!',
                              },
                            ],
                          })(<DatePicker />)}
                        </Form.Item>
                        <Form.Item
                          label="When"
                          className="prescription_date field_width"
                        >
                          {getFieldDecorator('when', {
                            rules: [
                              // {
                              //     required: true,
                              //     message: 'Please select!',
                              // },
                            ],
                          })(
                            <Select placeholder="Select When">
                              <Option value="morning">Morning</Option>
                              <Option value="afternoon">Afternoon</Option>
                              <Option value="evening">Evevning</Option>
                            </Select>,
                          )}
                        </Form.Item>

                        <Form.Item
                          label="With"
                          className="prescription_date field_width"
                        >
                          {getFieldDecorator('With ', {
                            rules: [
                              // {
                              //     required: true,
                              //     message: 'Please select!',
                              // },
                            ],
                          })(
                            <Select placeholder="Select With">
                              <Option value="hot water">Hot Water</Option>
                              <Option value="cold water">Cold Water</Option>
                              <Option value="without">Without Water</Option>
                            </Select>,
                          )}
                        </Form.Item>

                        <Form.Item
                          label="How Often"
                          className="prescription_date field_width"
                        >
                          {getFieldDecorator('often', {
                            // rules: [
                            //     {
                            //         required: true,
                            //         message: 'Please select!',
                            //     },
                            // ],
                          })(
                            <Select placeholder="Select a option">
                              <Option value="after_meal">After Meal</Option>
                              <Option value="before_meal">Before Meal</Option>
                            </Select>,
                          )}
                        </Form.Item>
                        <Form.Item>
                          {getFieldDecorator('notes')(<TextArea rows={3} />)}
                        </Form.Item>
                      </div>

                      {this.state.prescriptionItems.map((item, index) => (
                        <div className="new-item" key={index}>
                          <Form.Item
                            label="What"
                            className="prescription_date field_width"
                          >
                            {getFieldDecorator('what', {
                              rules: [
                                // {
                                //     required: true,
                                //     message: 'Please select Medicine!',
                                // },
                              ],
                            })(
                              <Select placeholder="Select a option">
                                <Option value="">Abhayarishtam</Option>
                                <Option value="">Amritarishtam</Option>
                                <Option value="">Ashtachurnam</Option>
                                <Option value="">Brahmi Ghritam</Option>
                                <Option value="">Amritotharam Kashayam</Option>
                              </Select>,
                            )}
                          </Form.Item>
                          <Form.Item
                            label="Unit"
                            className="prescription_date field_width"
                            style={{ width: '15%' }}
                          >
                            {getFieldDecorator('unit', {
                              // rules: [
                              //     {
                              //         required: true,
                              //         message: 'Please select!',
                              //     },
                              // ],
                            })(
                              <Select placeholder="Select a option">
                                <Option value="ltr">ltr</Option>
                                <Option value="grm">grm</Option>
                              </Select>,
                            )}
                          </Form.Item>

                          <Form.Item
                            label="Quantity"
                            className="prescription_date field_width"
                            style={{ width: '15%' }}
                          >
                            {getFieldDecorator('quantity', {
                              rules: [
                                // {
                                //     required: true,
                                //     message: 'Please select!',
                                // },
                              ],
                            })(
                              <Select placeholder="Select Quantity">
                                <Option value="1/2">1/2</Option>
                                <Option value="1">1</Option>
                                <Option value="2">2</Option>
                                <Option value="3">3</Option>
                              </Select>,
                            )}
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
                        onClick={e => this.addprescriptionItems(e)}
                        className="btn"
                        type="primary"
                      >
                        Add Compound Medicine
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

const CreatePrescription = Form.create({ name: 'coordinated' })(
  CreatePrescriptionFormData,
);

export default CreatePrescription;
