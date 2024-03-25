import { ErrorUtil, HttpErrorStatusCode } from '../utils/error-util';
import { ActivityModel } from '../models/activity/activity-model';
import { AverageSessionModel } from '../models/average-session/average-session-model';
import { ErrorModel } from '../models/error-model';
import { PerformancesModel } from '../models/performances/performances-model';
import { UserModel } from '../models/user/user-model';

class UsersService {
  /**
   * @param id
   * @return {Promise<UserModel | ErrorModel>}
   */
  getOneUserById(id) {
    return fetch(`http://localhost:3005/users/${id}`)
      .then(this._getJson)
      .then(response => UserModel.mapRecords(response))
      .catch(this._catchErrorAndReturnErrorModel);
  }

  /**
   * @param id
   * @return {Promise<ActivityModel | ErrorModel>}
   */
  getOneUserActivityById(id) {
    return fetch(`http://localhost:3005/users/${id}/activity`)
      .then(this._getJson)
      .then(response => ActivityModel.mapRecords(response))
      .catch(this._catchErrorAndReturnErrorModel);
  }

  /**
   * @param id
   * @return {Promise<AverageSessionModel | ErrorModel>}
   */
  getOneUserAverageSessionById(id) {
    return fetch(`http://localhost:3005/users/${id}/average-sessions`)
      .then(this._getJson)
      .then(response => AverageSessionModel.mapRecords(response))
      .catch(this._catchErrorAndReturnErrorModel);
  }

  /**
   * @param id
   * @return {Promise<PerformancesModel | ErrorModel>}
   */
  getOneUserPerformanceById(id) {
    return fetch(`http://localhost:3005/users/${id}/performance`)
      .then(this._getJson)
      .then(response => PerformancesModel.mapRecords(response))
      .catch(this._catchErrorAndReturnErrorModel);
  }

  /**
   * @param response
   * @return {Response}
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
    throw new ErrorModel({
      statusCode: error.status,
      message:
        error.status === HttpErrorStatusCode.notFound
          ? ErrorUtil.messageNotFound
          : error.statusText,
    });
  }
}

export default UsersService;
