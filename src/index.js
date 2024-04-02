import './index.scss';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import LayoutComponent from './components/layout/LayoutComponent';
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Router>
      <LayoutComponent>
        <Routes>
          <Route path='/user/:id' element={<DashboardPage />} />
        </Routes>
      </LayoutComponent>
    </Router>
  </>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
