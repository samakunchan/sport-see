import '../utils/utils';
import { MenuBase } from './bases/menu-base';

/**
 * Crée une instance de menu de la sidebar hérité de {MenuBase}.
 * @class
 * @param {{label: string}} menu - Les données du menu.
 * @returns {ToolbarMenuModel} Une instance de ToolbarMenuModel.
 */
export class ToolbarMenuModel extends MenuBase {
  /**
   * Crée une instance de ToolbarMenuModel.
   * @constructor
   * @param {{label: string}} menu - Les données du menu.
   */
  constructor(menu) {
    super(menu);
    const { label } = menu;
    this._label = label;
  }

  /**
   * @return {string}
   */
  get label() {
    return this._label.ucFirst();
  }
}
