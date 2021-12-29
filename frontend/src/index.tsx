import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Pages } from './pages/pages';
import { AuthStateProvider } from './services/auth/auth-state-provider';

ReactDOM.render(
  <React.StrictMode>
    <AuthStateProvider>
      <Pages />
    </AuthStateProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
