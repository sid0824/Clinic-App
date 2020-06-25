import React, { Component } from 'react';
import QueueAnim from 'rc-queue-anim';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import {
  Select,
  Form,
  Input,
  Button,
  DatePicker,
  Icon,
  Switch,
  Avatar,
  Modal,
} from 'antd';
import './CreatePrescription.scss';

import auth from '../../utils/auth';
import history from '../../utils/history';
import logo from '../../images/hospital.png';
import Vitals from '../Vitals';
import BloodReport from '../BloodReport';
const { Option } = Select;
const { TextArea } = Input;
const FormItem = Form.Item;
const { confirm } = Modal;
const id = 0;
let uuid = 0;
let uuid1 = 0;
const children = [];
for (let i = 10; i < 36; i++) {
  children.push(
    <Option key={i.toString(36) + i}>
      {`${i.toString(36)}item number${i}`}
    </Option>,
  );
}

class CreatePrescriptionFormData extends React.Component {
  state = {
    formType: 'add-patient',
    prescriptionItems: [],
    enableCompound: false,
    bloodvisible: false,
    vitalvisible: false,
    doDataObj: [],
    dontDataObj: [],
  };

  CreatePrescriptionFn = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // Should format date value before submit.
        const fieldsValues = {
          ...values,
          // 'date-picker': values['date-picker'].format('DD-MM-YYYY'),
        };

        console.log('Received values of form: ', fieldsValues);

        const dataObj = fieldsValues.newkeys.map(i =>
          Object.assign({
            items: {
              when: `${fieldsValues.when.filter((j, index) => i === index)}`,
              how: `${fieldsValues.how.filter((k, index) => i === index)}`,
              with: `${fieldsValues.with.filter((l, index) => i === index)}`,
              drugs: fieldsValues.newkeys.map(i =>
                eval(`values.drugkeys${i}`).map((q, index) =>
                  Object.assign({
                    what: `${fieldsValues.what.map((m, index) => q === index)}`,
                    quantity: `${fieldsValues.quantity.map(
                      (m, index) => q === index,
                    )}`,
                    unit: `${fieldsValues.unit.map((m, index) => q === index)}`,
                  }),
                ),
              ),
              starton: `${fieldsValues.starton.filter(
                (m, index) => i === index,
              )}`,
              startoff: `${fieldsValues.startoff.filter(
                (n, index) => i === index,
              )}`,
              description: `${fieldsValues.notes.filter(
                (o, index) => i === index,
              )}`,
              type: `${fieldsValues.drugtype.filter(
                (p, index) => i === index,
              )}`,
            },
          }),
        );
      }
    });
  };

  showBloodModal = () => {
    this.setState({
      bloodvisible: true,
    });
  };

  showVitalModal = () => {
    this.setState({
      vitalvisible: true,
    });
  };

  bloodhandleOk = e => {
    console.log(e);
    this.setState({
      bloodvisible: false,
      vitalvisible: false,
    });
  };

  bloodhandleCancel = e => {
    console.log(e);
    this.setState({
      bloodvisible: false,
      vitalvisible: false,
    });
  };

  componentWillMount() {}

  // add = () => {
  //   const { form } = this.props;
  //   // can use data-binding to get
  //   const keys = form.getFieldValue('keys');
  //   const nextKeys = keys.concat(id++);
  //   // can use data-binding to set
  //   // important! notify form to detect changes
  //   form.setFieldsValue({
  //     keys: nextKeys,
  //   });
  // };

  // add1 = index => {
  //   const { form } = this.props;
  //   // can use data-binding to get
  //   const subkeys = form.getFieldValue('subkeys');
  //   const nextKeys = subkeys.concat(id++);
  //   // can use data-binding to set
  //   // important! notify form to detect changes
  //   form.setFieldsValue({
  //     keys: nextKeys,
  //   });
  // };

  // remove = k => {
  //   const { form } = this.props;
  //   // can use data-binding to get
  //   const keys = form.getFieldValue('keys');
  //   // We need at least one passenger
  //   if (keys.length === 1) {
  //     return;
  //   }

  //   // can use data-binding to set
  //   form.setFieldsValue({
  //     keys: keys.filter(key => key !== k),
  //   });
  // };

  remove = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('newkeys');
    // We need at least one passenger
    if (keys.length === 1) {
      // return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      newkeys: keys.filter(key => key !== k),
    });
  };

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('newkeys');
    const nextKeys = keys.concat(uuid);
    uuid++;
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      newkeys: nextKeys,
    });
  };

  remove1 = (k, l) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue(`drugkeys${k}`);
    let newkeys = [];
    // We need at least one passenger
    if (keys) {
      newkeys = keys;
    } else {
      newkeys = [];
    }
    if (newkeys.length === 1) {
      // return;
    }
    // can use data-binding to set
    form.setFieldsValue({
      [`drugkeys${k}`]: newkeys.filter(key => key !== l),
    });
  };

  showConfirm = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('newkeys');
    const nextKeys = keys.concat(uuid);
    uuid++;
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      newkeys: nextKeys,
    });
    confirm({
      title: 'Do you Want to delete these items?',
      content: 'Some descriptions',
      onOk() {
        form.setFieldsValue({
          [`drugtype${uuid}`]: 100,
        });
      },
      onCancel() {
        form.setFieldsValue({
          [`drugtype${uuid}`]: 200,
        });
      },
    });
  };

  handleChangeDrugType = value => {
    console.log(`selected ${value}`);
  };

  add1 = index => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue(`drugkeys${index}`);
    let newkeys = [];
    if (keys) {
      newkeys = keys;
    } else {
      newkeys = [0];
    }
    const nextKeys = newkeys.concat(uuid1);
    uuid1++;
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      [`drugkeys${[index]}`]: nextKeys,
    });
  };

  doHandleChange = value => {
    this.setState({
      doDataObj: value,
    });
  };

  dontHandleChange = value => {
    this.setState({
      dontDataObj: value,
    });
  };

  enableCompoundFn = (val, event) => {
    // const {
    //   target: { name, value },
    // } = event;
    // this.setState({ [name]: value });
    // console.log(this.state);
    this.setState({
      enableCompound: val,
    });
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { drugsList, userData, doList, dontList } = this.props;

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
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };

    let newkeys = [];
    let drugkeys = [];
    const correctAnswer = [];
    getFieldDecorator('newkeys', { initialValue: [] });
    newkeys = getFieldValue('newkeys');
    for (let i = 0; i < newkeys.length; i++) {
      getFieldDecorator(`drugkeys${i}`, { initialValue: [] });
    }
    const formItems = newkeys.map((k, index) => {
      drugkeys = getFieldValue(`drugkeys${k}`);
      // correctAnswer = getFieldValue(`rightanswer${k}`);
      // if (
      //   drugkeys == undefined ||
      //   drugkeys == null ||
      //   drugkeys.length == 0
      // ) {
      //   drugkeys = [];
      // }
      return (
        <div>
          <div className="dr-pr-item">
            {/* {drugkeys &&
              drugkeys.length > 0 &&
              drugkeys.map((l, index1) => (
                <div className="row">
                  <div className="col-md-3">
                    <Form.Item label="What">
                      {getFieldDecorator(`what[${l}]`, {
                        rules: [
                          {
                            required: true,
                            message: 'Please select Medicine!',
                          },
                        ],
                      })(
                        <Select
                          dropdownClassName="pr-select-dropdown"
                          placeholder="Select one"
                        >
                          {drugsList.map(o => (
                            <Option value={o.brand.id}>{o.brand.name}</Option>
                          ))}
                        </Select>,
                      )}
                    </Form.Item>
                  </div>

                  <div className="col-md-3">
                    <div className="row">
                      <div className="col-md-6">
                        <Form.Item label="Quantity">
                          {getFieldDecorator(`quantity[${l}]`, {
                            rules: [
                              {
                                required: true,
                                message: 'Please input quantity!',
                              },
                            ],
                          })(
                            <Input
                              {...this.props}
                              // onChange={this.onChange}
                              // onBlur={this.onBlur}
                              placeholder="Quantity"
                              maxLength={25}
                            />,
                          )}
                        </Form.Item>
                      </div>
                      <div className="col-md-6">
                        <Form.Item label="Unit">
                          {getFieldDecorator(`unit[${l + 100}]`, {
                            rules: [
                              {
                                required: true,
                                message: 'Please select unit!',
                              },
                            ],
                          })(
                            <Select placeholder="Select a option">
                              <Option value="ltr">ltr</Option>
                              <Option value="grm">grm</Option>
                            </Select>,
                          )}
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 add-compound-drug">
                    <Button
                      style={{ color: 'red', fontWeight: 400 }}
                      type="danger"
                      onClick={() => this.remove1(k, l)}
                    >
                      <Icon type="minus" /> Remove
                    </Button>
                  </div>
                  <div
                    className={
                      correctAnswer && correctAnswer.indexOf(l) != -1
                        ? 'active'
                        : ''
                    }
                    key={l}
                  >
                    <FormItem>
                      {getFieldDecorator(`answer${l}`, {
                        validate: [
                          {
                            trigger: ['onBlur'],
                            rules: [
                              {
                                required: true,
                                message: 'Please enter your Answer',
                              },
                            ],
                          },
                        ],
                      })(<Input type="" placeholder=" Enter Answer" />)}

                      <span
                        className="TickCsl"
                        onClick={() => this.remove1(k, l)}
                      >
                        <Icon type="delete" />
                      </span>
                    </FormItem>
                  </div>
                </div>
              ))} */}

            {/* {drugkeys &&
            drugkeys.length > 0 &&
            this.props.isRightAnswerEmpty != undefined &&
            this.props.isRightAnswerEmpty == k ? (
              <div style={{ color: '#f5222d', paddingLeft: '35px' }}>
                Please select right answer!
              </div>
            ) : (
              ''
            )}
             */}

            <div className="dr-create-prescription-item">
              <div className="dc-remove-pr">
                <Form.Item>
                  {getFieldDecorator(`drugtype[${k}]`, {
                    initialValue: 100,
                  })(
                    <Select placeholder="Select Drug">
                      <Option value={100}>Simple</Option>
                      <Option value={200}>Compound</Option>
                    </Select>,
                  )}
                </Form.Item>

                <Switch
                  className="drug-toggle"
                  checkedChildren="Compound Drug"
                  unCheckedChildren="Simple Drug"
                  defaultChecked={this.state.enableCompound}
                  onChange={(ev, event) => this.enableCompoundFn(ev, event)}
                />
                {newkeys.length > 1 ? (
                  <Icon
                    className="dynamic-delete-button"
                    type="minus-circle-o"
                    onClick={() => this.remove(k)}
                  />
                ) : null}
              </div>
              {/* {this.state.enableCompound && drugkeys.length < 3 ? ( */}
              <div className="col-md-3 add-compound-drug">
                <Button type="dashed" onClick={() => this.add1(k)}>
                  <Icon type="plus" /> Add Drug
                </Button>
              </div>
              <br />
              <br />
              <br />
              <br />
              {/* ) : null} */}
              {drugkeys &&
                drugkeys.length > 0 &&
                drugkeys.map((l, index1) => (
                  <div className="row">
                    <div className="col-md-3">
                      <Form.Item label="What">
                        {getFieldDecorator(`what[${k}][${l}]`, {
                          rules: [
                            {
                              required: true,
                              message: 'Please select Medicine!',
                            },
                          ],
                        })(
                          <Select
                            dropdownClassName="pr-select-dropdown"
                            placeholder="Select one"
                          >
                            {drugsList.map(o => (
                              <Option value={o.brand.id}>{o.brand.name}</Option>
                            ))}
                          </Select>,
                        )}
                      </Form.Item>
                    </div>
                    <div className="col-md-3">
                      <div className="row">
                        <div className="col-md-6">
                          <Form.Item label="Quantity">
                            {getFieldDecorator(`quantity[${k}][${l}]`, {
                              rules: [
                                {
                                  required: true,
                                  message: 'Please input qunatity!',
                                },
                              ],
                            })(
                              <Input
                                {...this.props}
                                // onChange={this.onChange}
                                // onBlur={this.onBlur}
                                placeholder="Quantity"
                                maxLength={25}
                              />,
                            )}
                          </Form.Item>
                        </div>
                        <div className="col-md-6">
                          <Form.Item label="Unit">
                            {getFieldDecorator(`unit[${k}][${l}]`, {
                              rules: [
                                {
                                  required: true,
                                  message: 'Please select unit!',
                                },
                              ],
                            })(
                              <Select placeholder="Select a option">
                                <Option value="ltr">ltr</Option>
                                <Option value="grm">grm</Option>
                              </Select>,
                            )}
                          </Form.Item>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3 add-compound-drug">
                      <Button
                        style={{ color: 'red', fontWeight: 400 }}
                        type="danger"
                        onClick={() => this.remove1(k, l)}
                      >
                        <Icon type="minus" /> Remove
                      </Button>
                    </div>
                  </div>
                ))}
              <div className="row">
                <div className="col-md-3">
                  <Form.Item label="When">
                    {getFieldDecorator(`when[${k}]`, {
                      rules: [
                        {
                          required: true,
                          message: 'Please select!',
                        },
                      ],
                    })(
                      <Select
                        placeholder="Select When"
                        dropdownClassName="pr-select-dropdown"
                      >
                        {this.props.drugWhenList.map(o => (
                          <Option value={o.id}>{o.title}</Option>
                        ))}
                        {/* <Option value="morning">Morning</Option>
                        <Option value="afternoon">Afternoon</Option>
                        <Option value="evening">Evevning</Option> */}
                      </Select>,
                    )}
                  </Form.Item>
                </div>
                <div className="col-md-3">
                  <Form.Item label="How">
                    {getFieldDecorator(`how[${k}]`, {
                      rules: [
                        {
                          required: true,
                          message: 'Please select how!',
                        },
                      ],
                    })(
                      <Select
                        dropdownClassName="pr-select-dropdown"
                        placeholder="Select one"
                      >
                        {this.props.drugHowList.map(o => (
                          <Option value={o.id}>{o.title}</Option>
                        ))}
                      </Select>,
                    )}
                  </Form.Item>
                </div>
                <div className="col-md-3">
                  <Form.Item label="With">
                    {getFieldDecorator(`with[${k}]`, {
                      rules: [
                        {
                          required: true,
                          message: 'Please select!',
                        },
                      ],
                    })(
                      <Select
                        placeholder="Select with"
                        dropdownClassName="pr-select-dropdown"
                      >
                        {this.props.drugWithList.map(o => (
                          <Option value={o.id}>{o.title}</Option>
                        ))}
                      </Select>,
                    )}
                  </Form.Item>
                </div>

                <div className="col-md-3">
                  <Form.Item label="Start On" className="prescription_date">
                    {getFieldDecorator(`starton[${k}]`, {
                      rules: [
                        {
                          type: 'object',
                          required: true,
                          message: 'Please select date!',
                        },
                      ],
                    })(<DatePicker />)}
                  </Form.Item>
                </div>

                <div className="col-md-9 doctor-description">
                  <Form.Item>
                    {getFieldDecorator(`notes[${k}]`, {
                      rules: [
                        {
                          required: true,
                          message: 'Please select date!',
                        },
                      ],
                    })(<TextArea placeholder="Description" rows={2} />)}
                  </Form.Item>
                </div>
                <div className="col-md-3">
                  <Form.Item label="Start Off" className="prescription_date">
                    {getFieldDecorator(`startoff[${k}]`, {
                      rules: [
                        {
                          type: 'object',
                          required: false,
                          message: 'Please select date!',
                        },
                      ],
                    })(<DatePicker />)}
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>

          {/* <div>
            <FormItem className="Quest">
              {getFieldDecorator('question' + k, {
                validate: [
                  {
                    trigger: ['onBlur'],
                    rules: [
                      {
                        required: true,
                        message: 'Please enter your Question!',
                      },
                    ],
                  },
                ],
              })(<Input type="" placeholder="Enter Question" />)}
            </FormItem>
          </div> */}
        </div>
      );
    });
    // const formItems = keys.map((k, index) => (
    //   <div className="dr-pr-item">
    //     <div className="row">
    //       {/* <div className="col-md-3">
    //         <Form.Item label="Select drug">
    //           {getFieldDecorator(`drug[${k}]`, {
    //             initialValue: 'simple',
    //             rules: [
    //               // {
    //               //     required: true,
    //               //     message: 'Please select!',
    //               // },
    //             ],
    //           })(
    //             <Select placeholder="Select Drug" defaultValue="simple">
    //               <Option value="simple">Simple</Option>
    //               <Option value="compound">Compound</Option>
    //             </Select>,
    //           )}
    //         </Form.Item>
    //       </div> */}

    //       {/* <Form.Item
    //           label={index === 0 ? 'Passengers' : ''}
    //           required={false}
    //           key={k}
    //         >
    //           {getFieldDecorator(`names[${k}]`, {
    //           validateTrigger: ['onChange', 'onBlur'],
    //             rules: [
    //               {
    //                 required: true,
    //                 whitespace: true,
    //                 message:
    //                 "Please input passenger's name or delete this field.",
    //               },
    //             ],
    //         })(
    //             <Input
    //               placeholder="passenger name"
    //               style={{ width: '60%', marginRight: 8 }}
    //             />,
    //           )}
    //         </Form.Item> */}

    //       <div className="col-md-3">
    //         <Form.Item label="What">
    //           {getFieldDecorator(`what[${k}]`, {
    //             rules: [
    //               // {
    //               //     required: true,
    //               //     message: 'Please select Medicine!',
    //               // },
    //             ],
    //           })(
    //             <Select
    //               dropdownClassName="pr-select-dropdown"
    //               placeholder="Select one"
    //             >
    //               {drugsList.map(o => (
    //                 <Option value={o.brand.id}>{o.brand.name}</Option>
    //               ))}
    //             </Select>,
    //           )}
    //         </Form.Item>
    //       </div>
    //       <div className="col-md-3">
    //         <div className="row">
    //           <div className="col-md-6">
    //             <Form.Item label="Quantity">
    //               {getFieldDecorator(`quantity[${k}]`, {
    //                 rules: [
    //                   // {
    //                   //     required: true,
    //                   //     message: 'Please select!',
    //                   // },
    //                 ],
    //               })(
    //                 <Input
    //                   {...this.props}
    //                   // onChange={this.onChange}
    //                   // onBlur={this.onBlur}
    //                   placeholder="Quantity"
    //                   maxLength={25}
    //                 />,
    //               )}
    //             </Form.Item>
    //           </div>
    //           <div className="col-md-6">
    //             <Form.Item label="Unit">
    //               {getFieldDecorator(`unit[${k}]`, {
    //                 // rules: [
    //                 //     {
    //                 //         required: true,
    //                 //         message: 'Please select!',
    //                 //     },
    //                 // ],
    //               })(
    //                 <Select placeholder="Select a option">
    //                   <Option value="ltr">ltr</Option>
    //                   <Option value="grm">grm</Option>
    //                 </Select>,
    //               )}
    //             </Form.Item>
    //           </div>
    //         </div>
    //       </div>

    //       {this.state.enableCompound ? (
    //         <div className="col-md-3 add-compound-drug">
    //           <Button type="dashed" onClick={() => this.add1(k)}>
    //             <Icon type="plus" /> Add Drug
    //           </Button>
    //         </div>
    //       ) : null}

    //       <ol className="AswField">
    //         {subkeys &&
    //           subkeys.length > 0 &&
    //           subkeys.map((l, index1) => (
    //             <li
    //               // className={
    //               //   correctAnswer && correctAnswer.indexOf(l) != -1
    //               //     ? 'active'
    //               //     : ''
    //               // }
    //               key={l}
    //             >
    //               <Form.Item>
    //                 {getFieldDecorator(`answer${l}`, {
    //                   validate: [
    //                     {
    //                       trigger: ['onBlur'],
    //                       rules: [
    //                         {
    //                           required: true,
    //                           message: 'Please enter your Answer',
    //                         },
    //                       ],
    //                     },
    //                   ],
    //                 })(<Input type="" placeholder=" Enter Answer" />)}

    //                 <span
    //                   className="TickCsl"
    //                   onClick={() => this.remove1(k, l)}
    //                 >
    //                   <Icon type="delete" />
    //                 </span>
    //               </Form.Item>
    //             </li>
    //           ))}
    //       </ol>
    //     </div>
    //     <div className="row">
    //       <div className="col-md-3">
    //         <Form.Item label="When">
    //           {getFieldDecorator(`when[${k}]`, {
    //             rules: [
    //               // {
    //               //     required: true,
    //               //     message: 'Please select!',
    //               // },
    //             ],
    //           })(
    //             <Select placeholder="Select When">
    //               <Option value="morning">Morning</Option>
    //               <Option value="afternoon">Afternoon</Option>
    //               <Option value="evening">Evevning</Option>
    //             </Select>,
    //           )}
    //         </Form.Item>
    //       </div>
    //       <div className="col-md-3">
    //         <Form.Item label="How">
    //           {getFieldDecorator(`how[${k}]`, {
    //             rules: [
    //               // {
    //               //     required: true,
    //               //     message: 'Please select Medicine!',
    //               // },
    //             ],
    //           })(
    //             <Select
    //               dropdownClassName="pr-select-dropdown"
    //               placeholder="Select one"
    //             >
    //               {drugsList.map(o => (
    //                 <Option value={o.brand.id}>{o.brand.name}</Option>
    //               ))}
    //             </Select>,
    //           )}
    //         </Form.Item>
    //       </div>
    //       <div className="col-md-3">
    //         <Form.Item label="With">
    //           {getFieldDecorator(`with[${k}]`, {
    //             rules: [
    //               // {
    //               //     required: true,
    //               //     message: 'Please select!',
    //               // },
    //             ],
    //           })(
    //             <Select placeholder="Select with">
    //               <Option value="morning">Morning</Option>
    //               <Option value="afternoon">Afternoon</Option>
    //               <Option value="evening">Evevning</Option>
    //             </Select>,
    //           )}
    //         </Form.Item>
    //       </div>

    //       <div className="col-md-3">
    //         <Form.Item label="Start On" className="prescription_date">
    //           {getFieldDecorator('start', {
    //             rules: [
    //               {
    //                 type: 'object',
    //                 required: true,
    //                 message: 'Please select date!',
    //               },
    //             ],
    //           })(<DatePicker />)}
    //         </Form.Item>
    //       </div>

    //       <div className="col-md-9 doctor-description">
    //         <Form.Item>
    //           {getFieldDecorator(`notes[${k}]`)(
    //             <TextArea placeholder="Description" rows={2} />,
    //           )}
    //         </Form.Item>
    //       </div>
    //       <div className="col-md-3">
    //         <Form.Item label="Start Off" className="prescription_date">
    //           {getFieldDecorator('start', {
    //             rules: [
    //               {
    //                 type: 'object',
    //                 required: true,
    //                 message: 'Please select date!',
    //               },
    //             ],
    //           })(<DatePicker />)}
    //         </Form.Item>
    //       </div>
    //     </div>

    //     <div className="dc-remove-pr">
    //       <Switch
    //         className="drug-toggle"
    //         checkedChildren="Compound Drug"
    //         unCheckedChildren="Simple Drug"
    //         defaultChecked={this.state.enableCompound}
    //         onChange={this.enableCompoundFn}
    //       />
    //       {keys.length > 1 ? (
    //         <Icon
    //           className="dynamic-delete-button"
    //           type="minus-circle-o"
    //           onClick={() => this.remove(k)}
    //         />
    //       ) : null}
    //     </div>
    //   </div>
    // ));

    return (
      <div className="comp-wrap">
        <Helmet
          titleTemplate="%s - Sample-App"
          defaultTitle="Create Prescription | Sample-App"
        >
          <meta name="description" content="sample application" />
        </Helmet>

        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h2>
                {userData.user.first_name} {userData.user.last_name}
              </h2>
              <h4> Age: {userData.age}</h4>
            </div>
            <div className="col-md-6 text-right">
              <h2>Code: {userData.code}</h2>
              <p />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="cards-wrap row justify-content-md-center">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="prescription-form">
                <div className="login-form" style={{ borderRadius: '5px' }}>
                  <div className="pr-login-box">
                    <Form onSubmit={this.handleSubmit}>
                      <div className="row">
                        <div className="col-md-2">
                          <Form.Item
                            label="Start"
                            className="prescription_date"
                          >
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
                        </div>
                        <div className="col-md-4">
                          <Form.Item label="Do's" className="dos">
                            {getFieldDecorator('dos', {
                              rules: [
                                {
                                  // type: 'object',
                                  required: true,
                                  message: 'Please choose dos!',
                                },
                              ],
                            })(
                              <Select
                                label="Dos"
                                mode="tags"
                                style={{ width: '100%' }}
                                onChange={this.doHandleChange}
                                tokenSeparators={[',']}
                              >
                                {doList.map(o => (
                                  <Option value={`${o.title}`}>
                                    {o.title}
                                  </Option>
                                ))}
                              </Select>,
                            )}
                          </Form.Item>
                        </div>

                        <div className="col-md-4">
                          <Form.Item label="Don'ts" className="dos">
                            {getFieldDecorator('donts', {
                              rules: [
                                {
                                  // type: 'object',
                                  required: true,
                                  message: 'Please choose donts!',
                                },
                              ],
                            })(
                              <Select
                                label="Donts"
                                mode="tags"
                                style={{ width: '100%' }}
                                onChange={this.dontHandleChange}
                                tokenSeparators={[',']}
                              >
                                {dontList.map(o => (
                                  <Option value={`${o.title}`}>
                                    {o.title}
                                  </Option>
                                ))}
                              </Select>,
                            )}
                          </Form.Item>
                        </div>

                        <div className="col-md-2">
                          <Modal
                            title="Add Blood Report"
                            visible={this.state.bloodvisible}
                            onOk={this.bloodhandleOk}
                            onCancel={this.bloodhandleCancel}
                          >
                            <div>
                              <BloodReport />
                            </div>
                          </Modal>

                          <Modal
                            title="Add Vital Report"
                            visible={this.state.vitalvisible}
                            footer={null}
                            // onOk={this.bloodhandleOk}
                            onCancel={this.bloodhandleCancel}
                          >
                            <div>
                              <Vitals />
                            </div>
                          </Modal>
                          <br />
                          <Button
                            onClick={this.showBloodModal}
                            style={{ width: '100%', minHeight: '50px' }}
                            type="primary cl-border"
                          >
                            <Icon type="plus" /> Blood Report
                          </Button>
                          <Button
                            onClick={this.showVitalModal}
                            style={{
                              width: '100%',
                              minHeight: '50px',
                              marginTop: '15px',
                            }}
                            type="primary cl-border"
                          >
                            <Icon type="plus" /> Vitals
                          </Button>
                        </div>
                      </div>
                      <div className="presription-wrapper">{formItems}</div>

                      {/* <input onChange={(e) => this.handleChange(e, index)} value={item}></input> */}
                      {/* <a
                        className="remove"
                        onClick={() => this.handleRemove(index)}
                      >
                        <Icon type="close-circle" />
                      </a> */}

                      <div className="row">
                        <div className="col-md-6">
                          <Button
                            type="dashed"
                            onClick={this.showConfirm}
                            style={{ width: '100%' }}
                          >
                            <Icon type="plus" /> Add Prescription Item
                          </Button>
                        </div>
                        <div className="col-md-6">
                          <Button
                            type="primary"
                            className="cl-fill"
                            onClick={this.CreatePrescriptionFn}
                            style={{ width: '100%' }}
                            htmlType="submit"
                            onClick={e => this.CreatePrescriptionFn(e)}
                          >
                            Save
                          </Button>
                        </div>
                      </div>

                      <Form.Item {...tailFormItemLayout} className="form-btn">
                        {/* <Button
                          className="cl-clone"
                          type="button"
                          htmlType="button"
                        >
                          Cancel
                        </Button> */}
                        {/* <Button
                          className="cl-fill btn-h-40 btn-save float-right"
                          type="primary"
                          htmlType="submit"
                          onClick={e => this.CreatePrescriptionFn(e)}
                        >
                          Save
                        </Button> */}
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
