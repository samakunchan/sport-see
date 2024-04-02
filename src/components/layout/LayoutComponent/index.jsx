import './index.scss';
import { ErrorUtil, HttpErrorStatusCode } from '../../../core/utils/error-util';
import React, { useEffect, useState } from 'react';
import FooterComponent from '../FooterComponent';
import { Link } from 'react-router-dom';
import SidebarLayoutComponent from '../SidebarLayoutComponent';
import ToolbarLayoutComponent from '../ToolbarLayoutComponent';
import UsersService from '../../../core/services/users-service';

const LayoutComponent = ({ children }) => {
  const [status, setStatus] = useState(false);

  useEffect(() => {
    const userService = new UsersService();
    userService.testApi().catch(setStatus);
  }, []);

  return (
    <div>
      <ToolbarLayoutComponent />
      <main className={'layout-content'}>
        <SidebarLayoutComponent />
        {status.statusCode !== HttpErrorStatusCode.serverOffline ? (
          <section className={'content'}>
            <div>
              <Link to={'/user/12'}>Karl</Link>
              <Link to={'/user/18'}>Cécilia</Link>
            </div>
            {children}
          </section>
        ) : (
          <section className={'content'}>
            <h1>{ErrorUtil.serverIsOffline}</h1>
          </section>
        )}
        <FooterComponent />
      </main>
    </div>
  );
};

export default LayoutComponent;
