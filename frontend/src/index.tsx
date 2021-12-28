import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Pages } from './pages/pages';
import { AuthProvider } from './services/auth/auth-provider';
import { AuthStorageService } from './services/auth/auth-storage.service';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider authStorageService={new AuthStorageService()}>
      <Pages />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
