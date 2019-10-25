/*global document */
import * as React from 'react';
import { render } from 'react-dom';
// import styles
import './styles/index.scss';
import AppComponent from './components/app';

const app = document.getElementById('app');
render(<AppComponent />, app);
// Service worker register
(function() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js');
  }
})();
