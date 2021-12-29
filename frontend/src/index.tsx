import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Pages } from './pages/pages';
import { AuthStateProvider } from './services/auth/auth-state-provider';
import { MyToaster } from './components/my-toaster';

ReactDOM.render(
  <React.StrictMode>
    <AuthStateProvider>
      <Pages />
      <MyToaster />
    </AuthStateProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
