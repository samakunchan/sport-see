import './index.scss';
import {sideBarMenusDatas} from '../../../core/utils/menus-datas';

/**
 * Créer une liste de menu
 * @param menu {SidebarMenuModel}
 * @return {JSX.Element}
 */
const buildMenu = menu => (
  <li key={menu.id}>
    <img src={menu.iconeSrc} alt={menu.iconeAlt} />
  </li>
);

/**
 * Créer le composant SidebarLayoutComponent
 * @return {JSX.Element<SidebarLayoutComponent>}
 * @constructor
 */
const SidebarLayoutComponent = () => {
  return (
    <nav className={'side-nav'}>
      <ul>{sideBarMenusDatas.map(buildMenu)}</ul>
    </nav>
  );
};

export default SidebarLayoutComponent;
