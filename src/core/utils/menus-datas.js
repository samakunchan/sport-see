import {MenuFactory} from '../factories/menu-factory';

/**
 * Liste des menus en object
 * @type {MenuFactory[]}
 */
export const toolBarMenusDatas = ['Accueil', 'profil', 'réglage', 'communauté'].map(
  (label, index) => new MenuFactory({ ...index, label }),
);
