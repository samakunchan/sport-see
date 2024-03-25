export class KeydataModel {
  constructor(data) {
    const { calorieCount, proteinCount, carbohydrateCount, lipidCount } = data;
    this._calorieCount = calorieCount;
    this._proteinCount = proteinCount;
    this._carbohydrateCount = carbohydrateCount;
    this._lipidCount = lipidCount;
  }

  /**
   * @return {number}
   */
  get calorieCount() {
    return this._calorieCount;
  }

  /**
   * @return {number}
   */
  get proteinCount() {
    return this._proteinCount;
  }

  /**
   * @return {number}
   */
  get carbohydrateCount() {
    return this._carbohydrateCount;
  }

  /**
   * @return {number}
   */
  get lipidCount() {
    return this._lipidCount;
  }
}
