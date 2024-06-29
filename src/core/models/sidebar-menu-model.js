import { MenuBase } from './bases/menu-base';
import { RouteName } from '../utils/utils';

/**
 * Crée une instance de menu de la sidebar hérité de {MenuBase}.
 * @class
 * @param {{icone: string}} menu - Les données du menu.
 * @returns {SidebarMenuModel} Une instance de SidebarMenuModel.
 */
export class SidebarMenuModel extends MenuBase {
  /**
   * Crée une instance de SidebarMenuModel.
   * @constructor
   * @param {{icone: string}} menu - Les données du menu.
   */
  constructor(menu) {
    super(menu);
    const { icone } = menu;
    this._icone = icone;
  }

  /**
   * @return {string}
   */
  get iconeSrc() {
    return `${RouteName.basePath}/assets/svg/${this._icone}.svg`;
  }

  /**
   * @return {string}
   */
  get iconeAlt() {
    return `Icone ${this._icone}`;
  }
}
