import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { InfoProvider } from './context/infoContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <InfoProvider>
      <App />
    </InfoProvider>
  </BrowserRouter>
);
