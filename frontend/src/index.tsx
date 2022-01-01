import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Pages } from './pages/pages';
import { AuthStateProvider } from './services/auth/auth-state-provider';
import { MyToaster } from './components/my-toaster';
import { DiaryStateProvider } from './services/diary/diary-state-provider';

ReactDOM.render(
  <React.StrictMode>
    <AuthStateProvider>
      <DiaryStateProvider>
        <Pages />
        <MyToaster />
      </DiaryStateProvider>
    </AuthStateProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
