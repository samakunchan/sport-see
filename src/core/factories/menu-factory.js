import {ToolbarMenuModel} from '../models/toolbar-menu-model';

/**
 * Crée une instance de menu en fonction des données fournies.
 * @class
 * @param {Object} datas - Les données du menu.
 * @returns {ToolbarMenuModel} Une instance de ToolbarMenuModel ou SidebarMenuModel.
 * @throws {Error} Si le format des données est incorrect.
 */
export class MenuFactory {
  constructor(datas) {
    const { label } = datas;
    if (label !== undefined) {
      return new ToolbarMenuModel(datas);
    }
    throw new Error('Format incorrect pour le menu factory');
  }
}
