import 'regenerator-runtime/runtime';
import 'typeface-roboto';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { reduxStore } from './framework/redux';
import i18n from './i18n';

class AppRoot extends Component {
  render = () => (
    <I18nextProvider i18n={i18n}>
      <Provider store={reduxStore}>
        <h1>This is a test</h1>
      </Provider>
    </I18nextProvider>
  );
}

ReactDOM.render(<AppRoot />, document.getElementById('app'));
