export class PerformanceModel {
  constructor(data) {
    const { value, kind } = data;
    this._performance = value;
    this._kind = kind;
  }

  /**
   * @return {number}
   */
  get performance() {
    return this._performance;
  }

  /**
   * @return {number}
   */
  get kind() {
    return this._kind;
  }
}
