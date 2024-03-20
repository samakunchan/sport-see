import '../utils/utils';
import { MenuBase } from './bases/menu-base';

export class ToolbarMenuModel extends MenuBase {
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
