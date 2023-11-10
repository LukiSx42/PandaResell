import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './home';
import Navbar from './navbar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Navbar />
    <Home />
  </React.StrictMode>
);
