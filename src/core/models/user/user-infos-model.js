export class UserInfosModel {
  constructor(userInfo) {
    const { firstName, lastName, age } = userInfo;
    this._firstName = firstName;
    this._lastName = lastName;
    this._age = age;
  }

  /**
   * @return {string}
   */
  get firstName() {
    return this._firstName ?? `[utilisateur]`;
  }

  /**
   * @return {string}
   */
  get lastName() {
    return this._lastName ?? `[utilisateur]`;
  }

  /**
   * @return {number}
   */
  get age() {
    return this._age ?? 0;
  }
}
