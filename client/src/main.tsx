import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/index.css';
import App from '@/App';
import { AuthContextProvider } from '@/contexts/AuthContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
