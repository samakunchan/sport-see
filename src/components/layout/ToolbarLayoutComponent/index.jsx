import './index.scss';
import logo from '../../../assets/images/logo.png';
import { toolBarMenusDatas } from '../../../core/utils/menus-datas';

/**
 * Créer une liste de menu
 * @param menu {ToolbarMenuModel}
 * @return {JSX.Element}
 */
const buildMenu = menu => <li key={menu.id}>{menu.label}</li>;

const ToolbarLayoutComponent = () => {
  return (
    <header>
      <nav className={'top-nav'}>
        <img src={logo} alt='Logo SportSee' />
        <ul>{toolBarMenusDatas.map(buildMenu)}</ul>
      </nav>
    </header>
  );
};

export default ToolbarLayoutComponent;
