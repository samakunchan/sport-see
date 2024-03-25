import { KeydataModel } from './keydata-model';
import { UserInfosModel } from './user-infos-model';

/**
 * Crée une instance de UserModel.
 * @class
 * @param {{id: number, userInfos: object, todayScore: number, keyData: object}} user - Les données utilisateur.
 * @returns {UserModel} Une instance de UserModel.
 */
export class UserModel {
  /**
   * Crée une instance de UserModel.
   * @constructor
   * @param {{id: number, userInfos: object, todayScore: number, keyData: object}} user - Les données utilisateur.
   */
  constructor(user) {
    const { id, userInfos, todayScore, keyData } = user;
    this._id = id;
    this._userInfos = userInfos;
    this._todayScore = todayScore;
    this._keyData = keyData;
  }

  /**
   * @return {number}
   */
  get id() {
    return this._id;
  }

  /**
   * @return {UserInfosModel}
   */
  get userInfos() {
    return new UserInfosModel(this._userInfos);
  }

  /**
   * @return {number}
   */
  get todayScore() {
    return this._todayScore;
  }

  /**
   * @return {KeydataModel}
   */
  get keyData() {
    return new KeydataModel(this._keyData);
  }

  /**
   * Pour transformer les données de l'API en objet
   * @param records
   * @return {UserModel}
   */
  static mapRecords(records) {
    return new UserModel(records['data']);
  }

  /**
   * @return {UserModel}
   */
  static get null() {
    return null;
  }
}
