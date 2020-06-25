import React from 'react';
import { FormattedMessage } from 'react-intl';

// import A from './A';
import { Button, Layout, Menu, Avatar, Popover, Modal, Icon } from 'antd';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import messages from './messages';
import './Header.scss';
import Support from '../Support';

import auth from '../../utils/auth';
import history from '../../utils/history';
import logo from '../../images/hospital.png';

const { Header, Footer } = Layout;

class PrimaryHeader extends React.Component {
  openSupportModal = ev => {
    // <Support EnableModal={this.EnablleSupportModal} />
    const modal = Modal.info({
      title: '',
      content: <Support />,
    });
  };

  logOutUser = () => {
    auth.clearAppStorage();
    history.push('/login');
  };

  goToDashboard = () => {
    history.push('/dashboard');
  };

  render() {
    console.log('header', this.props);

    if (
      window.location.pathname === '/login' ||
      window.location.pathname === '/forgot-password' ||
      window.location.pathname === '/reset-password' ||
      window.location.pathname === '/'
    )
      return null;

    return (
      <div className="pr-header-comp-wrapper">
        <Header className="header">
          <div className="container">
            <div className="logo">
              <a onClick={this.goToDashboard}>
                <Img src={logo} alt="Sample-App" />
              </a>
            </div>

            <Menu
              theme="dark"
              mode="horizontal"
              // defaultSelectedKeys={['1']}
              style={{ lineHeight: '64px', background: 'None' }}
            >
              {/* <Menu.Item key="1">
                <HeaderLink to="/users" style={{ color: '#fff' }}>
                  <FormattedMessage {...messages.users} />
                </HeaderLink>
              </Menu.Item> */}

              {/* <Menu.Item key="2">
                <HeaderLink to="/dashboard" style={{ color: '#fff' }}>
                  <FormattedMessage {...messages.home} />
                </HeaderLink>
              </Menu.Item> */}

              {/* <Menu.Item key="3">
                <HeaderLink to="/features" style={{ color: '#fff' }}>
                  <FormattedMessage {...messages.features} />
                </HeaderLink>
              </Menu.Item> */}

              {/* <Menu.Item key="6">
                <HeaderLink to="/reset-password" style={{ color: '#fff' }}>
                  <FormattedMessage {...messages.resetpassword} />
                </HeaderLink>
              </Menu.Item> */}
            </Menu>

            <div className="float-right">
              <div>
                <Popover
                  placement="bottomRight"
                  trigger="click"
                  content={
                    <div className="pr-user-menu pr-modal-form">
                      {/* <Button className="cl-none" type="secondary">
                        <HeaderLink to="/userdetail">
                          <i className="icon-Action-click-21x" /> User detail
                        </HeaderLink>
                      </Button>
                      <Button className="cl-none" type="secondary">
                        <i className="icon-Action-click-151x" /> Change password
                      </Button>
                      <Button className="cl-none" type="secondary">
                        <i className="icon-Action-click-321x" /> Settings
                      </Button> */}
                      <Button
                        onClick={this.logOutUser}
                        className="cl-none"
                        type="secondary"
                      >
                        <i className="icon-Action-click-101x" /> Logout
                      </Button>
                    </div>
                  }
                >
                  <Avatar className="pr-icon-user-wrap" size="large">
                    G
                    <span className="pr-ur-profilie-icon">
                      <Icon type="caret-down" />{' '}
                    </span>
                  </Avatar>
                </Popover>
              </div>
            </div>
          </div>
        </Header>
      </div>
    );
  }
}
export default PrimaryHeader;
