export class SessionModel {
  constructor(session) {
    const { day, sessionLength } = session;
    this._day = day;
    this._sessionLength = sessionLength;
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
  get sessionLength() {
    return this._sessionLength;
  }
}
