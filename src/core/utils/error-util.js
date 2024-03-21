export class ErrorUtil {
  /**
   * Message : <br> Oups! La page que vous demandez n'existe pas.
   * @type {string}
   */
  static messageNotFound = `Oups! La page que vous demandez n'existe pas.`;
}

export class HttpErrorStatusCode {
  /**
   * StatusCode : 400.
   * @type {number}
   */
  static default = 400;

  /**
   * StatusCode : 404.
   * @type {number}
   */
  static notFound = 404;
}
