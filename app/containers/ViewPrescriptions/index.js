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
} from 'antd';
import './CreatePrescription.scss';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import CreatePrescription from 'components/CreatePrescription';
import { CreatePrescriptionReq, DrugsListReq } from './action';
import reducer from './reducer';
import saga from './saga';

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import history from '../../utils/history';

const { Option } = Select;
const { TextArea } = Input;

class ViewPrescriptions extends React.Component {
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

  prescriptionInfo = (e, prescription) => {
    e.stopPropagation();
    history.push({
      pathname: '/user/prescription-detail',
      state: { prescription },
    });
  };

  render() {
    const columns = [
      {
        title: 'Start Date',
        dataIndex: 'a',
      },
      {
        title: 'End Date',
        dataIndex: 'b',
      },
      {
        title: 'No of items',
        dataIndex: 'c',
      },
      {
        title: 'Completed',
        dataIndex: 'd',
        render: status => (
          <span>
            {status === true ? (
              <div>
                <Badge status="success" /> Yes
              </div>
            ) : (
              ''
            )}
            {status === false ? (
              <div>
                <Badge status="warning" /> Pending
              </div>
            ) : (
              ''
            )}
          </span>
        ),
      },
      {
        title: 'Action',
        key: 'id',
        sorter: false,
        sortDirections: ['descend', 'ascend'],
        render: prescription => (
          <span>
            <a onClick={e => this.prescriptionInfo(e, prescription)}>View</a>
          </span>
        ),
      },
    ];

    const data = [
      {
        a: '10-10-2010',
        b: '10-11-2010',
        c: 3,
        d: true,
      },
      {
        a: '10-11-2010',
        b: '10-12-2010',
        c: 5,
        d: false,
      },
      {
        a: '9-01-2010',
        b: '10-01-2010',
        c: 11,
        d: true,
      },
      {
        a: '08-03-2010',
        b: '08-09-2010',
        c: 10,
        d: false,
      },
      {
        a: '01-10-2018',
        b: '10-11-2018',
        c: 10,
        d: true,
      },
      {
        a: '10-10-2019',
        b: '10-11-2019',
        c: 5,
        d: true,
      },
    ];
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
            <h1>View Prescriptions</h1>
          </div>
        </div>
        <div className="container">
          <div className="cards-wrap row justify-content-md-center">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="pr-tabel-wrapper">
                <Table
                  columns={columns}
                  dataSource={data}
                  // rowKey={record => record.user_id}
                  pagination={false}
                />
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

const withReducer = injectReducer({ key: 'createprescription', reducer });
const withSaga = injectSaga({ key: 'createprescription', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ViewPrescriptions);
