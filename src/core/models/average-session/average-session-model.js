import { SessionModel } from './session-model';

export class AverageSessionModel {
  constructor(activity) {
    const { userId, sessions } = activity;
    this._userId = userId;
    this._sessions = sessions;
  }

  /**
   * @return {number}
   */
  get userId() {
    return this._userId;
  }

  /**
   * @return {SessionModel[]}
   */
  get sessions() {
    return this._sessions.map(session => new SessionModel(session));
  }

  /**
   * Pour transformer les données de l'API en objet
   * @param records
   * @return {AverageSessionModel}
   */
  static mapRecords(records) {
    return new AverageSessionModel(records['data']);
  }

  /**
   * @return {AverageSessionModel}
   */
  static get null() {
    return null;
  }
}
