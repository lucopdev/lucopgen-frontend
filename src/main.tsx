import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ApiProvider from './context/ApiContext';
import './App.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ApiProvider>
        <App />
      </ApiProvider>
    </BrowserRouter>
  </React.StrictMode>
);
