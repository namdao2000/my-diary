import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Pages } from './pages/pages';
import { AuthProvider } from './services/auth-provider';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Pages />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
