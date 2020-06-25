/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from 'containers/PrivateRoute/Loadable';

import Dashboard from 'containers/Dashboard/Loadable';
import UserDetail from 'containers/UserDetail/Loadable';

import PrimaryHeader from 'components/Header';
import Auth from 'containers/Auth/Loadable';

import CreatePatient from 'containers/CreatePatient/Loadable';
import ViewPrescriptions from 'containers/ViewPrescriptions/Loadable';
import PrescriptionsDetails from 'containers/PrescriptionsDetails/Loadable';
import CreatePrescription from 'containers/CreatePrescription/Loadable';
import auth from '../../utils/auth';

import GlobalStyle from '../../global-styles';

const Themes = {
  ThemeFresh: 'primary-theme',
  CrazyWarm: 'secondary-theme',
  DimpleBlue: 'dimple-blue',
  CuteBerry: 'cute-berry',
  SmartRed: 'smart-red',
};
class App extends React.Component {
  state = {
    currentTheme: Themes.ThemeFresh,
  };

  changeThemeColor = ev => {
    this.setState({
      currentTheme: ev.target.value,
      showMenuBar: false,
    });
  };

  componentDidMount() {
    if (auth.getToken()) {
      this.setState({ showMenuBar: true });
    }
  }

  render() {
    return (
      <div>
        <div id={this.state.currentTheme}>
          <Helmet titleTemplate="%s " defaultTitle="Sample App">
            <meta name="description" content="Sample application" />
          </Helmet>
          <Route path="/" component={PrimaryHeader} />

          <div className="pr-body-comp-wrapper">
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <Route exact path="/login" component={Auth} />
              <Route exact path="/" component={Auth} />
              <Route exact path="/forgot-password" component={Auth} />
              <Route exact path="/reset-password" component={Auth} />
              <Route
                path="/userdetail"
                component={UserDetail}
                themechangeevtapp={this.changeThemeColor}
              />
              {/* <PrivateRoute path="/patients" component={Dashboard} /> */}
              <PrivateRoute
                exact
                path="/add-patient"
                component={CreatePatient}
              />
              <Route
                exact
                path="/create-prescription"
                component={CreatePrescription}
              />
              <Route
                exact
                path="/user/view-prescriptions"
                component={ViewPrescriptions}
              />

              <Route
                exact
                path="/user/prescription-detail"
                component={PrescriptionsDetails}
              />

              {/* <Route path="" component={NotFoundPage} /> */}
            </Switch>
          </div>
          {/* <Footer /> */}
          <GlobalStyle />
        </div>
      </div>
    );
  }
}

export default App;
