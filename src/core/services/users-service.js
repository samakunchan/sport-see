import { ErrorUtil, HttpErrorStatusCode } from '../utils/error-util';
import { ActivityModel } from '../models/activity/activity-model';
import { AverageSessionModel } from '../models/average-session/average-session-model';
import { ErrorModel } from '../models/error-model';
import { PerformanceModel } from '../models/performances/performances-model';
import { UserModel } from '../models/user/user-model';

class UsersService {
  /**
   * Vérifie si l'API est en ligne ou pas.
   * @return {Promise<* | ErrorModel>} - Des données
   */
  testApi() {
    return fetch('http://localhost:3005/users')
      .then(this._getJson)
      .catch(this._catchErrorAndReturnErrorModel);
  }

  /**
   * @param id {string} - Id de l'utilisateur venant de l'url
   * @return {Promise<UserModel>} - Les données utilisateur
   * sauf si il y a une érreur
   */
  getOneUserById(id) {
    return fetch(`http://localhost:3005/users/${id}`)
      .then(this._getJson)
      .then(response => UserModel.mapRecords(response))
      .catch(this._catchErrorAndReturnErrorModel);
  }

  /**
   * @param id {string} - Id de l'utilisateur venant de l'url.
   * @return {Promise<ActivityModel | ErrorModel>} - Les données des activités utilisateur
   * sauf si il y a une érreur.
   */
  getOneUserActivityById(id) {
    return fetch(`http://localhost:3005/users/${id}/activity`)
      .then(this._getJson)
      .then(response => ActivityModel.mapRecords(response))
      .catch(this._catchErrorAndReturnErrorModel);
  }

  /**
   * @param id {string} - Id de l'utilisateur venant de l'url.
   * @return {Promise<AverageSessionModel | ErrorModel>} - Les données des sessions moyenne utilisateur
   * sauf si il y a une érreur.
   */
  getOneUserAverageSessionById(id) {
    return fetch(`http://localhost:3005/users/${id}/average-sessions`)
      .then(this._getJson)
      .then(response => AverageSessionModel.mapRecords(response))
      .catch(this._catchErrorAndReturnErrorModel);
  }

  /**
   * @param id {string} - Id de l'utilisateur venant de l'url.
   * @return {Promise<PerformanceModel | ErrorModel>} - Les données des performances utilisateur
   * sauf si il y a une érreur.
   */
  getOneUserPerformanceById(id) {
    return fetch(`http://localhost:3005/users/${id}/performance`)
      .then(this._getJson)
      .then(response => PerformanceModel.mapRecords(response))
      .catch(this._catchErrorAndReturnErrorModel);
  }

  /**
   * @param response - Reponse de l'API.
   * @return {Response} - Les données en JSON.
   */
  _getJson(response) {
    if (!response.ok) {
      throw response;
    }
    return response.json();
  }

  /**
   * @return {ErrorModel}
   */
  _catchErrorAndReturnErrorModel(error) {
    const isApiOffline = error.message === 'Failed to fetch';
    const isNotFound = error.status === HttpErrorStatusCode.notFound;

    const statusCode = UsersService._getStatusCode({
      isApiOffline,
      isNotFound,
    });

    const message = UsersService._getErrorMessage({
      statusCode,
      statusText: error.statusText,
    });

    throw new ErrorModel({
      statusCode,
      message,
    });
  }

  /**
   * Génère des status codes.
   * @param isApiOffline {boolean} - Si l'API est en ligne.
   * @param isNotFound {boolean} - Si l'utilisateur existe.
   * @return {number} - 400, 404, 500.
   * @private
   */
  static _getStatusCode({ isApiOffline, isNotFound }) {
    switch (true) {
      case isApiOffline:
        return HttpErrorStatusCode.serverOffline;
      case isNotFound:
        return HttpErrorStatusCode.notFound;
      default:
        return HttpErrorStatusCode.default;
    }
  }

  /**
   * Génère des messages d'érreur personalisés.
   * @param statusCode {number} - 400, 404, 500.
   * @param statusText {string} - Message d'érreur si aucune érreur est géré.
   * @return {string} - Message d'érreur personalisé.
   * @private
   */
  static _getErrorMessage({ statusCode, statusText }) {
    switch (statusCode) {
      case HttpErrorStatusCode.serverOffline:
        return ErrorUtil.serverIsOffline;
      case HttpErrorStatusCode.notFound:
        return ErrorUtil.messageNotFound;
      default:
        return statusText.toString();
    }
  }
}

export default UsersService;
