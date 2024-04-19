export class PerformanceDatasModel {
  constructor(data) {
    const { value, kind } = data;
    this._performance = value;
    this._kind = kind;
  }

  /**
   * @return {number}
   */
  get score() {
    return this._performance;
  }

  /**
   * @return {number}
   */
  get kind() {
    return this._kind;
  }

  /**
   * @return {string}
   */
  get label() {
    switch (this._kind) {
      case 1:
        return 'Cardio';
      case 2:
        return 'Energie';
      case 3:
        return 'Endurance';
      case 4:
        return 'Force';
      case 5:
        return 'Vitesse';
      case 6:
        return 'Intensité';
      default:
        return 'Label non reconnu';
    }
  }
}
