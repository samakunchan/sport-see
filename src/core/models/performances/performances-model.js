import { PerformanceModel } from './performance-model';

export class PerformancesModel {
  constructor(performances) {
    const { userId, kind, data } = performances;
    this._userId = userId;
    this._kind = kind;
    this._datas = data;
  }

  /**
   * @return {number}
   */
  get userId() {
    return this._userId;
  }

  /**
   * @return {Record}
   */
  get kind() {
    return this._kind;
  }

  /**
   * @return {number}
   */
  get performance() {
    return this._datas.map(data => new PerformanceModel(data));
  }

  /**
   * Pour transformer les données de l'API en objet
   * @param records
   * @return {PerformancesModel}
   */
  static mapRecords(records) {
    return new PerformancesModel(records['data']);
  }

  /**
   * @return {PerformancesModel}
   */
  static get null() {
    return null;
  }
}
