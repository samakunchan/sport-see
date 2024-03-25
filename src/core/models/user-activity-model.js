import { SessionModel } from './session-model';

export class UserActivityModel {
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
   * @return {UserActivityModel}
   */
  static mapRecords(records) {
    return new UserActivityModel(records['data']);
  }

  /**
   * @return {UserActivityModel}
   */
  static get null() {
    return null;
  }
}
