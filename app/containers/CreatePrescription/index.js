import React, { Component } from 'react';
import { Select, Form, Input, Button, DatePicker, Icon } from 'antd';
import './CreatePrescription.scss';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import CreatePrescription from 'components/CreatePrescription';
import {
  CreatePrescriptionReq,
  DrugsListReq,
  DrugHowListReq,
  DrugWhenListReq,
  DrugWithListReq,
  DontReqList,
  DoReqList,
} from './action';
import reducer from './reducer';
import saga from './saga';

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';

const { Option } = Select;
const { TextArea } = Input;

class CreatePrescriptionFormData extends React.Component {
  state = {
    formType: 'add-patient',
    prescriptionItems: [],
    userData: [],
  };

  componentWillMount() {
    const { history } = this.props;
    this.setState({
      userData: history.location.state,
    });

    this.props.DrugsListReq();
    this.props.DrugHowListReq();
    this.props.DrugWhenListReq();
    this.props.DrugWithListReq();
    this.props.DontReqList();
    this.props.DoReqList();
  }

  // handleSubmit = e => {
  //   e.preventDefault();
  // this.props.form.validateFieldsAndScroll((err, values) => {
  //   if (!err) {
  //     console.log('Received values of form: ', values);
  // }

  // Should format date value before submit.
  //  const fieldsValues = {
  //    ...values,
  //  'date-picker': values['date-picker'].format('DD-MM-YYYY')
  // }
  // console.log('Received values of form: ', fieldsValues);
  // });
  // };
  createPrescriptionFn = data => {
    console.log('Create prescription container', data);
    this.props.CreatePrescriptionReq(data);
  };

  addprescriptionItem() {
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
        <div className="container">
          <div className="cards-wrap  create-prescription-cont row justify-content-md-center">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <CreatePrescription
                patientData={this.CreatePrescriptionFn}
                drugsList={this.props.getDrugsListSuccess}
                userData={this.state.userData}
                drugHowList={this.props.drugHow}
                drugWhenList={this.props.drugWhen}
                drugWithList={this.props.drugWith}
                doList={this.props.doListData}
                dontList={this.props.dontListData}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  /**
   * Request API modals (POST)
   */
  CreatePrescriptionReq: data => {
    dispatch(CreatePrescriptionReq(data));
  },
  DrugsListReq: () => {
    dispatch(DrugsListReq());
  },
  DrugHowListReq: () => {
    dispatch(DrugHowListReq());
  },
  DrugWithListReq: () => {
    dispatch(DrugWithListReq());
  },
  DrugWhenListReq: () => {
    dispatch(DrugWhenListReq());
  },
  DontReqList: () => {
    dispatch(DontReqList());
  },
  DoReqList: () => {
    dispatch(DoReqList());
  },
});

const mapStateToProps = state => ({
  getDrugsListSuccess: state.createprescription.getDrugsListSuccess,
  drugHow: state.createprescription.howList,
  drugWhen: state.createprescription.whenList,
  drugWith: state.createprescription.withList,
  doListData: state.createprescription.doList,
  dontListData: state.createprescription.dontList,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'createprescription', reducer });
const withSaga = injectSaga({ key: 'createprescription', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(CreatePrescriptionFormData);
