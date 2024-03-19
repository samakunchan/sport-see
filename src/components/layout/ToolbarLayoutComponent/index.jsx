import './index.scss';
import logo from '../../../assets/images/logo.png';
import {toolBarMenusDatas} from '../../../core/utils/menus-datas';

/**
 * Créer une liste de menu
 * @param label {string}
 * @param index {number}
 * @return {JSX.Element}
 */
const buildMenu = ({ label }, index) => <li key={index}>{label}</li>;

const ToolbarLayoutComponent = () => {
  return (
    <header>
      <nav>
        <img src={logo} alt='Logo SportSee' />
        <ul>{toolBarMenusDatas.map(buildMenu)}</ul>
      </nav>
    </header>
  );
};

export default ToolbarLayoutComponent;
