/**
 * Crée une instance de MenuBase.
 * @class
 * @param {
 * {calorieCount: number},
 * {proteinCount: number},
 * {carbohydrateCount: number},
 * {lipidCount: number}
 * } data - Les infos clés sur les protéines, calories, glucide et lipide.
 * @returns {MenuBase} Une instance de MenuBase.
 */
export class KeydataModel {
  /**
   * @param {
   * {calorieCount: number},
   * {proteinCount: number},
   * {carbohydrateCount: number},
   * {lipidCount: number}
   * } data - Les infos clés sur les protéines, calories, glucide et lipide.
   * @param data
   */
  constructor(data) {
    const { calorieCount, proteinCount, carbohydrateCount, lipidCount } = data;
    this._calorieCount = calorieCount;
    this._proteinCount = proteinCount;
    this._carbohydrateCount = carbohydrateCount;
    this._lipidCount = lipidCount;
  }

  /**
   * @return {string}
   */
  get calorieCount() {
    return `${(this._calorieCount / 1000).toFixed(3)}kCal`;
  }

  /**
   * @return {string}
   */
  get proteinCount() {
    return `${this._proteinCount}g`;
  }

  /**
   * @return {string}
   */
  get carbohydrateCount() {
    return `${this._carbohydrateCount}g`;
  }

  /**
   * @return {string}
   */
  get lipidCount() {
    return `${this._lipidCount}g`;
  }
}
