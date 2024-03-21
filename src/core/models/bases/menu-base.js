/**
 * Crée une instance de MenuBase.
 * @class
 * @param {{icone: string} || {label: string}} menu - Les données du menu.
 * @returns {MenuBase} Une instance de MenuBase.
 */
export class MenuBase {
  /**
   * Crée une instance de MenuBase.
   * @constructor
   * @param {{icone: string} || {label: string}} menu - Les données du menu.
   */
  constructor(menu) {
    const { id, path } = menu;
    this._id = id;
    this._path = path;
  }

  /**
   * @return {number}
   */
  get id() {
    return this._id;
  }

  /**
   * @return {string}
   */
  get path() {
    return this._path;
  }
}
