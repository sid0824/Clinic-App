import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import QueueAnim from 'rc-queue-anim';
import { Form, Select, Button, Divider } from 'antd';

import UserProfile from 'components/UserProfile';
// import UserOrgProfile from 'components/CompanyDetails';

import auth from 'utils/auth';
import { debug } from 'util';
import Card from '../../components/Card';
import Settings from '../../components/Settings';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import './UserDetail.scss';

import {
  reqUserDetail,
  reqUserDetailSuccess,
  reqUpdateUserDetail,
} from './actions';
import reducer from './reducer';
import saga from './saga';

import { selectUserDetail } from '../App/selectors';
import history from '../../utils/history';

const { Option } = Select;

class UserDetail extends React.Component {
  state = {
    // eslint-disable-next-line react/no-unused-state
    userDetails: {},
  };

  callback = key => {
    console.log(key);
  };

  componentWillMount() {
    const { history } = this.props;
    /**
     * Request for user details
     */
    this.props.reqUserDetail(history.location.state.patient);
  }

  themeChangeEvtApp = e => {
    this.props.themechangeevtapp(e);
  };

  updateUserDetailsFn = data => {
    this.props.reqUpdateUserDetail(data);
  };

  goToCreatePrescription = () => {
    const { history } = this.props;

    history.push({
      pathname: '/create-prescription',
      state: history.location.state.patient,
    });
  };

  goToViewPrescriptions = () => {
    const { history } = this.props;

    history.push({
      pathname: '/user/view-prescriptions',
    });
  };

  render() {
    const { userDetails } = this.props;
    console.log('userDetails--------------', userDetails);
    return (
      <div className="comp-wrap">
        {/* <div className="component-title user-icon">
          <div className="container">
            <h1 key="a">User details</h1>
          </div>
        </div> */}
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div style={{ marginTop: '20px' }}>
                <Button
                  onClick={this.goToViewPrescriptions}
                  className="btn float-right"
                  type="primary"
                >
                  View Prescriptions
                </Button>
                <Button
                  onClick={this.goToCreatePrescription}
                  className="btn float-right"
                  type="primary"
                >
                  + Create Prescription
                </Button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <UserProfile
                updateUserDetailsEvt={this.updateUserDetailsFn}
                show_user_details={userDetails}
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
  reqUserDetail: data => {
    dispatch(reqUserDetail(data));
  },
  reqUpdateUserDetail: data => {
    dispatch(reqUpdateUserDetail(data));
  },
});

const mapStateToProps = state => ({
  userDetails: state.userdetail.userDetails,
  // loading: state.userdetail.loading,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({ key: 'userdetail', reducer });
const withSaga = injectSaga({ key: 'userdetail', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UserDetail);
