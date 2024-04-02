export class ErrorUtil {
  /**
   * Message : <br> Le serveur n'est pas en ligne.
   * @type {string}
   */
  static serverIsOffline = `Le serveur n'est pas en ligne.`;

  /**
   * Message : <br> Oups! Les données que vous cherchez n'existe pas.
   * @type {string}
   */
  static messageNotFound = `Oups! Les données que vous cherchez n'existe pas.`;
}

export class HttpErrorStatusCode {
  /**
   * StatusCode : 400.
   * @type {number}
   */
  static default = 400;

  /**
   * StatusCode : 500.
   * @type {number}
   */
  static serverOffline = 500;

  /**
   * StatusCode : 404.
   * @type {number}
   */
  static notFound = 404;
}
