/**
 * app.js
 *
 * This is the entry file for the application, only setup and prediktr-app
 * code.
 */

// Needed for redux-saga es6 generator support
import '@babel/polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import FontFaceObserver from 'fontfaceobserver';
import history from 'utils/history';
import { SENTRY_KEY } from 'utils/api';
import 'sanitize.css/sanitize.css';
import '../assests/scss/style.scss';
import 'bootstrap/dist/css/bootstrap.css';
import App from 'containers/App';
import LanguageProvider from './containers/LanguageProvider';
// Import root app

// Load the favicon and the .htaccess file
// import '!file-loader?name=[name].[ext]!./images/favicon.png';
import 'file-loader?name=.htaccess!./.htaccess'; // eslint-disable-line import/extensions

import configureStore from './configureStore';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({ dsn: `https://${SENTRY_KEY}@sentry.io/1867503` });
}

// Import i18n messages
// import { translationMessages } from './i18n';

// Observe loading of Source Sans Pro (to remove Source Sans Pro, remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Source Sans Pro', {});

// When Source Sans Pro is loaded, add a font-family using Source Sans Pro to the body
openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
});

// Create redux store with history
const initialState = {};

const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

const render = messages => {
  ReactDOM.render(
    <Provider store={store}>
      {/* <LanguageProvider messages={messages}> */}
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
      {/* </LanguageProvider> */}
    </Provider>,
    MOUNT_NODE,
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', 'containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render();
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise(resolve => {
    resolve(import('intl'));
  })
    .then(() =>
      Promise.all([
        import('intl/locale-data/jsonp/en.js'),
        // import('intl/locale-data/jsonp/de.js'),
      ]),
    ) // eslint-disable-line prettier/prettier
    .then(() => render())
    .catch(err => {
      throw err;
    });
} else {
  render();
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
