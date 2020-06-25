import React, { Component } from 'react';
import {
  Select,
  Form,
  Input,
  Button,
  DatePicker,
  Icon,
  Table,
  Badge,
  Divider,
} from 'antd';
import './CreatePrescription.scss';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import ReactToPrint from 'react-to-print';
import { CreatePrescriptionReq, DrugsListReq } from './action';
import reducer from './reducer';
import saga from './saga';
import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';

const { Option } = Select;
const { TextArea } = Input;

class PrescriptionsDetail extends React.Component {
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
            <h1>Prescriptions Details</h1>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-right" style={{ paddingRight: 0 }}>
              <ReactToPrint
                trigger={() => (
                  <Button type="secondary">
                    Print
                    <Icon type="printer" />
                  </Button>
                )}
                content={() => this.componentRef}
              />
              <br />
              <br />
            </div>
          </div>
          <div
            className="cards-wrap row justify-content-md-center"
            style={{
              background: ' #fff',
              padding: '20px',
              marginBottom: '30px',
            }}
            ref={el => (this.componentRef = el)}
          >
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="row">
                <div className="col-md-3 text-center">
                  <br />
                  <br />
                  <h1>LOGO</h1>
                  <br />
                  <br />
                  <br />
                </div>
                <div className="col-md-9 text-center">
                  <br />
                  <br />{' '}
                  <h1 style={{ color: '#14a3d3' }}>
                    Triveni Ayurvedic Nursing Home
                  </h1>
                  <br />
                  <br />
                  <br />
                </div>
              </div>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Dr Suresh BAMS</th>
                    <th scope="col">Prescription No: ABCD-1234566</th>
                    <th scope="col">Date: 12/09/2020</th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="col-md-12 col-sm-12 col-xs-12">
              <h3>Patient Details</h3>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Age</th>
                    <th scope="col">Sex</th>
                    <th scope="col">Patient Id</th>
                    <th scope="col">Patinet ID</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Pranay Chukkala</th>
                    <td>45</td>
                    <td>Male</td>
                    <td>ASVBBCNHC</td>
                    <td>fdfdfssfdsf</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-md-12 col-sm-12 col-xs-12">
              <h3>Medications</h3>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Medication</th>
                    <th scope="col">When</th>
                    <th scope="col">Method to consume</th>
                    <th scope="col">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <p>- Something - 1MG</p>
                    </td>
                    <td>Morning</td>
                    <td>
                      <p>How : Drink</p>
                      <br />
                      <p>With : Honey</p>
                      <br />
                      <p>Method : Warm</p>
                    </td>
                    <td>Do not eat</td>
                  </tr>
                  <tr>
                    <td>
                      <p>- Something - 2MG</p>
                    </td>
                    <td>Morning</td>
                    <td>
                      <p>How : Drink</p>
                      <br />

                      <p>With : Honey</p>
                      <br />

                      <p>Method : Warm</p>
                    </td>
                    <td>Do not eat</td>
                  </tr>
                  <tr>
                    <td>
                      <p>- Something - 3MG</p>
                    </td>
                    <td>Morning</td>
                    <td>
                      <p>How : Drink</p>
                      <br />
                      <p>With : Honey</p>
                      <br />
                      <p>Method : Warm</p>
                    </td>
                    <td>Do not eat</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div>
                <h3>Do's</h3>
                <ul>
                  <li>A</li>
                  <li>B</li>
                  <li>C</li>
                  <li>D</li>
                </ul>
                <Divider />
              </div>
              <div>
                <h3>Don'ts</h3>
                <ul>
                  <li>A</li>
                  <li>B</li>
                  <li>C</li>
                  <li>D</li>
                </ul>
                <Divider />
              </div>
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
});

const mapStateToProps = state => ({
  getDrugsListSuccess: state.createprescription.getDrugsListSuccess,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'prescriptiondetail', reducer });
const withSaga = injectSaga({ key: 'prescriptiondetail', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PrescriptionsDetail);
