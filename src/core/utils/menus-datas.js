import {SidebarMenuModel} from '../models/sidebar-menu-model';
import {ToolbarMenuModel} from '../models/toolbar-menu-model';

/**
 * Liste des menus en object
 * @type {ToolbarMenuModel[]}
 */
export const toolBarMenusDatas = ['Accueil', 'profil', 'réglage', 'communauté'].map(
  (label, index) => new ToolbarMenuModel({ id: index, label }),
);

/**
 * Liste des menus en object
 * @type {SidebarMenuModel[]}
 */
export const sideBarMenusDatas = ['yoga', 'swim', 'bike', 'force'].map(
  (icone, index) => new SidebarMenuModel({ id: index, icone }),
);
