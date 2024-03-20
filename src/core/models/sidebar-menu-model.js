import { MenuBase } from './bases/menu-base';

export class SidebarMenuModel extends MenuBase {
  constructor(menu) {
    super(menu);
    const { icone } = menu;
    this._icone = icone;
  }

  /**
   * @return {string}
   */
  get iconeSrc() {
    return `/sport-see/assets/svg/${this._icone}.svg`;
  }

  /**
   * @return {string}
   */
  get iconeAlt() {
    return `Icone ${this._icone}`;
  }
}
