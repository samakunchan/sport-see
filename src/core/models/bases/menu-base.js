export class MenuBase {
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
