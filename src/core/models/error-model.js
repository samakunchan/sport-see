import { ErrorUtil, HttpErrorStatusCode } from '../utils/error-util';

export class ErrorModel {
  constructor({ statusCode = HttpErrorStatusCode.default, message }) {
    this._statusCode = statusCode;
    this._message = message;
  }

  /**
   * @return {number}
   */
  get statusCode() {
    return this._statusCode;
  }

  /**
   * @return {String}
   */
  get message() {
    return this._message;
  }

  /**
   * Retourne le model de l'érreur 404
   * @return {ErrorModel}
   */
  static get notFound() {
    return new ErrorModel({
      statusCode: HttpErrorStatusCode.notFound,
      message: ErrorUtil.messageNotFound,
    });
  }

  /**
   * @return {ErrorModel}
   */
  static get null() {
    return null;
  }
}
