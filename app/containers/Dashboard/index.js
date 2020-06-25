import React from 'react';

import { connect } from 'react-redux';
import { compose } from 'redux';
// import { Scrollbars } from 'react-custom-scrollbars';

import CreatePatient from 'components/CreatePatient';
import AdSense from 'react-adsense';

import { Helmet } from 'react-helmet';
// UI components
import {
  Modal,
  Badge,
  Table,
  Button,
  Popover,
  Pagination,
  Avatar,
  Progress,
  Skeleton,
  Divider,
  Icon,
} from 'antd';

// import UserThumb from "components/UserThumb";

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';

import history from '../../utils/history';

import './Dashboard.scss';
import {
  requestPatientList,
  goToUserDetails,
  // CreatePatientReq
} from './actions';
import reducer from './reducer';
import saga from './saga';
import HeaderLink from '../../components/Header/HeaderLink';
import FindPatient from 'components/FindPatient';
import LoadingIndicator from 'components/LoadingIndicator';

// Utils
const { confirm } = Modal;

class Dashboard extends React.Component {
  state = {
    isSearchButton: true,
    isSearchFormOpen: false,
    loading: false,
  };

  componentWillMount() {
    const urlString = window.location.href;
    const url = new URL(urlString);

    console.log('users---');

    const {
      // eslint-disable-next-line react/prop-types
      requestPatientList,
    } = this.props;

    /**
     * Request for get patient list
     */
    requestPatientList('1');

    /**
     * Req fail messages from server
     */
    console.log('reqFail...:', this.props.reqFail);
    console.log('reqSuccess...:', this.props.reqSuccess);
  }

  handleSearchButton = e => {
    e.preventDefault();
    this.setState({
      isSearchButton: false,
      isSearchFormOpen: true,
    });
  };

  handleCloseButton = e => {
    e.preventDefault();
    this.setState({
      isSearchFormOpen: false,
    });
  };

  goToCreatePatient = () => {
    history.push('/add-patient');
  };

  patientInfo = (e, patient) => {
    e.stopPropagation();
    this.props.goToUserDetails(patient);

    history.push({
      pathname: '/userdetail',
      state: { patient },
    });
  };

  // createPatientDataFn = (data) => {
  //   console.log('dashboard container', data)
  //   this.props.CreatePatientReq(data);
  // }

  getProperUserName = user =>
    user.length > 15 ? `${user.slice('', 15)}...` : user;

  render() {
    const { patients, loading, loadingDevice } = this.props;

    console.log('updatedPatientsList', this.props.patients);

    const columns = [
      {
        title: 'Full Name',
        dataIndex: 'user.first_name',
        key: 'name',
        sorter: false,
        sortDirections: ['descend', 'ascend'],
        render: (name, user_detail) => (
          <div>
            <Avatar size="large" style={{ marginRight: '10px' }}>
              {name[0]}
            </Avatar>

            {this.getProperUserName(name)}
          </div>
        ),
      },
      {
        title: 'Email',
        dataIndex: 'user.email',
        sorter: false,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Age',
        dataIndex: 'age',
        sorter: false,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Gender',
        dataIndex: 'gender',
        sorter: false,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Patient ID',
        dataIndex: 'code',
        sorter: false,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Action',
        key: 'id',
        sorter: false,
        sortDirections: ['descend', 'ascend'],
        render: patient => (
          <span>
            <a onClick={e => this.patientInfo(e, patient)}>View</a>
          </span>
        ),
      },
    ];

    const rowSelection = {
      onchange: (selectedRowKeys, selectedRows) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          'selectedRows: ',
          selectedRows,
        );
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };

    const { size } = this.state;
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
            <h1>Dashboard</h1>
          </div>
        </div>
        <div className="container">
          {/* <div>
            <CreatePatient
              patientData={this.createPatientDataFn}
            />
          </div> */}

          <div className="cards-wrap row justify-content-md-center">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div>
                <Button
                  onClick={this.handleSearchButton}
                  className="btn float-right"
                  type="primary"
                >
                  <Icon type="search" />
                  Find Patient
                </Button>
                <Button
                  onClick={this.goToCreatePatient}
                  className="btn float-right"
                  type="primary"
                >
                  + New Patient
                </Button>
              </div>
              <Divider type="horizontal" />
              <div className="pr-tabel-wrapper">
                {this.state.isSearchFormOpen && (
                  <FindPatient form_open={this.handleCloseButton} />
                )}

                <Table
                  rowSelection={rowSelection}
                  columns={columns}
                  dataSource={patients}
                  // rowKey={record => record.user_id}
                  pagination={false}
                  loading={{
                    spinning: loading,
                    indicator: <LoadingIndicator />,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <AdSense.Google client="ca-pub-7292810486004926" slot="7806394673" />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  /**
   * Request API modals (GET)
   */
  requestPatientList: data => {
    dispatch(requestPatientList(data));
  },

  /**
   * Request API modals (POST)
   */
  // CreatePatientReq: data => {
  //   dispatch(CreatePatientReq(data));
  // }

  /**
   * Dispatch events for update states
   */
  goToUserDetails: data => {
    dispatch(goToUserDetails(data));
  },
});

const mapStateToProps = state =>
  // selectUsersPage(state);
  ({
    patients: state.dashboard.patients,
    createPatientSuccess: state.dashboard.createPatientSuccess,
    // pagination: state.dashboard.pagination,
    loading: state.dashboard.loading,
  });
// const mapStateToProps = selectUsersPage();
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'dashboard', reducer });
const withSaga = injectSaga({ key: 'dashboard', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Dashboard);
