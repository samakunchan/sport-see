import './index.scss';
import { ErrorUtil, HttpErrorStatusCode } from '../../../core/utils/error-util';
import React, { useEffect, useState } from 'react';
import ErrorPage from '../../../pages/ErrorPage';
// import FooterComponent from '../FooterComponent';
import OptionalLinksComponent from '../OptionalLinksComponent';
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
    <>
      <ToolbarLayoutComponent />
      <main className={'layout'}>
        <SidebarLayoutComponent />
        {status.statusCode !== HttpErrorStatusCode.serverOffline ? (
          <section className={'content'}>
            <OptionalLinksComponent />
            {children}
          </section>
        ) : (
          <section className={'content'}>
            <ErrorPage message={ErrorUtil.serverIsOffline} />
          </section>
        )}
      </main>
    </>
  );
};

export default LayoutComponent;
