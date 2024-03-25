import { ErrorUtil, HttpErrorStatusCode } from '../utils/error-util';
import { ActivityModel } from '../models/activity/activity-model';
import { ErrorModel } from '../models/error-model';
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
