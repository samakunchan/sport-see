import { PerformanceDatasModel } from './performance-datas-model';

export class PerformanceModel {
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
   * @return {PerformanceDatasModel[]}
   */
  get performances() {
    return this._datas.map(data => new PerformanceDatasModel(data));
  }

  /**
   * Pour transformer les données de l'API en objet
   * @param records
   * @return {PerformanceModel}
   */
  static mapRecords(records) {
    return new PerformanceModel(records['data']);
  }

  /**
   * @return {PerformanceModel}
   */
  static get null() {
    return null;
  }
}
