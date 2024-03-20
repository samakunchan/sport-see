import './index.scss';
import FooterComponent from '../FooterComponent';
import SidebarLayoutComponent from '../SidebarLayoutComponent';
import ToolbarLayoutComponent from '../ToolbarLayoutComponent';

const LayoutComponent = ({ children }) => {
  return (
    <div>
      <ToolbarLayoutComponent />
      <main className={'layout-content'}>
        <SidebarLayoutComponent />
        <section className={'content'}>{children}</section>
        <FooterComponent />
      </main>
    </div>
  );
};

export default LayoutComponent;
