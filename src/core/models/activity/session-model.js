export class SessionModel {
  constructor(session) {
    const { day, kilogram, calories } = session;
    this._day = day;
    this._kilogram = kilogram;
    this._calories = calories;
  }

  /**
   * @return {string}
   */
  get day() {
    return this._day;
  }

  /**
   * @return {number}
   */
  get kilogram() {
    return this._kilogram;
  }

  /**
   * @return {number}
   */
  get calories() {
    return this._calories;
  }
}
