import 'regenerator-runtime/runtime';
import 'typeface-roboto';
import React from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { reduxStore } from './framework/redux';
import i18n from './i18n';
import App from './App';
import './index.css';

const AppRoot = () => (
  <I18nextProvider i18n={i18n}>
    <Provider store={reduxStore}>
      <App />
    </Provider>
  </I18nextProvider>
);

ReactDOM.render(<AppRoot />, document.getElementById('app'));
