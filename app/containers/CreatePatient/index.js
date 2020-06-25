import React, { Component } from 'react';
import { Select, Form, Input, Button, DatePicker } from 'antd';
import './CreatePatient.scss';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import CreatePatient from 'components/CreatePatient';
import { CreatePatientReq } from './actions';
import reducer from './reducer';
import saga from './saga';

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import history from '../../utils/history';

const { Option } = Select;

class CreatePatientForm extends React.Component {
  state = {
    formType: 'add-patient',
  };

  // handleSubmit = e => {
  //     e.preventDefault();
  //     this.props.form.validateFieldsAndScroll((err, values) => {
  //         if (!err) {
  //             console.log('Received values of form: ', values);
  //         }

  //         // Should format date value before submit.
  //         const fieldsValues = {
  //             ...values,
  //             'date-picker': values['date-picker'].format('DD-MM-YYYY')
  //         }
  //         console.log('Received values of form: ', fieldsValues);
  //     });
  // };

  cancelCreatePatientFn = () => {
    history.push('/dashboard');
  };

  createPatientDataFn = data => {
    this.props.CreatePatientReq(data);
  };

  render() {
    return (
      <div className="comp-wrap">
        <Helmet
          titleTemplate="%s - Sample-App"
          defaultTitle="Patient Data | Sample-App"
        >
          <meta name="description" content="sample application" />
        </Helmet>
        <div className="component-title">
          <div className="container">
            <h1>Add Patient</h1>
          </div>
        </div>
        <div className="container">
          <div className="cards-wrap row justify-content-md-center">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <CreatePatient
                patientData={this.createPatientDataFn}
                cancelCreatePatient={this.cancelCreatePatientFn}
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
  CreatePatientReq: data => {
    dispatch(CreatePatientReq(data));
  },
});

const mapStateToProps = state => ({
  createPatientSuccess: state.dashboard.createPatientSuccess,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'createpatient', reducer });
const withSaga = injectSaga({ key: 'createpatient', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(CreatePatientForm);
