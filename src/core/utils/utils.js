// eslint-disable-next-line no-extend-native
String.prototype.ucFirst = function () {
  return this.split('')
    .map(text => text.toLowerCase())
    .map((text, index) => (index === 0 ? text.toUpperCase() : text))
    .join('');
};

export class RouteName {
  /**
   * /sport-see ou rien
   * @type {string|string}
   */
  static basePath = process.env.REACT_APP_ENV === 'gh-pages' ? `/sport-see` : ``;
}
