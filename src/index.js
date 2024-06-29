import './index.scss';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import ErrorPage from './pages/ErrorPage';
import { ErrorUtil } from './core/utils/error-util';
import LayoutComponent from './components/layout/LayoutComponent';
import OptionalLinksComponent from './components/layout/OptionalLinksComponent';
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { RouteName } from './core/utils/utils';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Router basename={RouteName.basePath}>
      <LayoutComponent>
        <Routes>
          <Route
            path={process.env.REACT_APP_ENV === 'gh-pages' ? RouteName.basePath : '/'}
            element={<OptionalLinksComponent />}
          />
          <Route path={`${RouteName.basePath}/user/:id`} element={<DashboardPage />} />
          <Route
            path={`${RouteName.basePath}/user/page-introuvable`}
            element={<ErrorPage message={ErrorUtil.messageNotFound} />}
          />
          <Route
            path='*'
            element={<Navigate to={`${RouteName.basePath}/user/page-introuvable`} replace />}
          />
        </Routes>
      </LayoutComponent>
    </Router>
  </>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
