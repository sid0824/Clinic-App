import React, { Component } from 'react';
import { Select, Form, Input, Button, Icon } from 'antd';

let id = 0;
const { Option } = Select;
// const CustomizedDrug = Form.create({
//   name: 'global_state',
//   onFieldsChange(props, changedFields) {
//     props.onChange(changedFields);
//   },
//   mapPropsToFields(props) {
//     return {
//       username: Form.createFormField({
//         ...props.username,
//         value: props.username.value,
//       }),
//     };
//   },
//   onValuesChange(_, values) {
//     console.log(values);
//   },
// })(props => {
//   const { getFieldDecorator } = props.form;
//   return (
//     <Form>
//       <div className="row">
//         <div className="col-md-3">
//           <Form.Item label="What">
//             {getFieldDecorator(`what`, {
//               rules: [
//                 {
//                   required: true,
//                   message: 'Please select Medicine!',
//                 },
//               ],
//             })(
//               <Select
//                 dropdownClassName="pr-select-dropdown"
//                 placeholder="Select one"
//               >
//                 {props.drugsListData !== undefined
//                   ? props.drugsListData.map(o => (
//                       <Option value={o.brand.id}>{o.brand.name}</Option>
//                     ))
//                   : ''}
//               </Select>,
//             )}
//           </Form.Item>
//         </div>

//         <div className="col-md-3">
//           <div className="row">
//             <div className="col-md-6">
//               <Form.Item label="Quantity">
//                 {getFieldDecorator(`quantity`, {
//                   rules: [
//                     {
//                       required: true,
//                       message: 'Please select!',
//                     },
//                   ],
//                 })(
//                   <Input
//                     // {...this.props}
//                     // onChange={this.onChange}
//                     // onBlur={this.onBlur}
//                     placeholder="Quantity"
//                     maxLength={25}
//                   />,
//                 )}
//               </Form.Item>
//             </div>
//             <div className="col-md-6">
//               <Form.Item label="Unit">
//                 {getFieldDecorator(`unit`, {
//                   rules: [
//                     {
//                       required: true,
//                       message: 'Please select!',
//                     },
//                   ],
//                 })(
//                   <Select placeholder="Select a option">
//                     <Option value="ltr">ltr</Option>
//                     <Option value="grm">grm</Option>
//                   </Select>,
//                 )}
//               </Form.Item>
//             </div>
//           </div>
//         </div>
//         {/* {this.state.enableCompound && answekeys.length < 3 ? (
//       <div className="col-md-3 add-compound-drug">
//         <Button type="dashed" onClick={() => this.add1(k)}>
//           <Icon type="plus" /> Add Drug
//         </Button>
//       </div>
//     ) : null} */}
//       </div>
//     </Form>
//     // <Form layout="inline">
//     //   <Form.Item label="Username">
//     //     {getFieldDecorator('username', {
//     //       rules: [{ required: true, message: 'Username is required!' }],
//     //     })(<Input />)}
//     //   </Form.Item>
//     // </Form>
//   );
// });

class DrugDataa extends React.Component {
  state = {
    fields: {
      username: {
        value: 'benjycui',
      },
    },
  };

  remove = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(id++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { keys, names } = values;
        console.log('Received values of form: ', values);
        console.log('Merged values:', keys.map(key => names[key]));
      }
    });
  };

  handleFormChange = changedFields => {
    this.setState(({ fields }) => ({
      fields: { ...fields, ...changedFields },
    }));
  };

  render() {
    const { fields } = this.state;
    const { drugsList } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
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
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => (
      <div className="row">
        <div className="col-md-3">
          <Form.Item label="What">
            {getFieldDecorator(`what[${k}]`, {
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
                {getFieldDecorator(`quantity[${k}]`, {
                  rules: [
                    {
                      required: true,
                      message: 'Please select!',
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
                {getFieldDecorator(`unit[${k}]`, {
                  rules: [
                    {
                      required: true,
                      message: 'Please select!',
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
          {keys.length < 3 ? (
            <div className="col-md-3 add-compound-drug">
              <Button type="dashed" onClick={() => this.add(k)}>
                <Icon type="plus" /> Add Drug
              </Button>
            </div>
          ) : null}
          <Button
            style={{ color: 'red', fontWeight: 400 }}
            type="danger"
            onClick={() => this.remove(k)}
          >
            <Icon type="minus" /> Remove
          </Button>
        </div>
        {/* <Form.Item
        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        label={index === 0 ? 'Passengers' : ''}
        required={false}
        key={k}
      >
        {getFieldDecorator(`names[${k}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [
            {
              required: true,
              whitespace: true,
              message: "Please input passenger's name or delete this field.",
            },
          ],
        })(
          <Input
            placeholder="passenger name"
            style={{ width: '60%', marginRight: 8 }}
          />,
        )}
        {keys.length > 1 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => this.remove(k)}
          />
        ) : null}
      </Form.Item> */}
      </div>
    ));
    return (
      <div className="pr-forms search-form">
        <Form onSubmit={this.handleSubmit}>
          {formItems}
          <Form.Item {...formItemLayoutWithOutLabel}>
            <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
              <Icon type="plus" /> Add field
            </Button>
          </Form.Item>
          <Form.Item {...formItemLayoutWithOutLabel}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        {/* <CustomizedDrug
          {...fields}
          drugsListData={drugsList}
          onChange={this.handleFormChange}
        /> */}
      </div>
    );
  }
}

const DrugData = Form.create({ name: 'coordinated' })(DrugDataa);

export default DrugData;
