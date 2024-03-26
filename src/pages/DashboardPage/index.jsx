import './index.scss';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ActivityModel } from '../../core/models/activity/activity-model';
import { AverageSessionModel } from '../../core/models/average-session/average-session-model';
import CardComponent from '../../components/bloc/CardComponent';
import NotificationComponent from '../../components/bloc/NotificationComponent';
import { PerformancesModel } from '../../core/models/performances/performances-model';
import TitleComponent from '../../components/bloc/TitleComponent';
import { UserModel } from '../../core/models/user/user-model';
import UsersService from '../../core/services/users-service';

const DashboardPage = () => {
  const [user, setUser] = useState(UserModel.null);
  const [activity, setActivity] = useState(ActivityModel.null);
  const [averageSession, setAverageSession] = useState(AverageSessionModel.null);
  const [performance, setPerformance] = useState(PerformancesModel.null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const userService = new UsersService();
    userService
      .getOneUserById(id) // 12 et 18
      .then(setUser)
      .catch(() => setUser(UserModel.null));
  }, [id, navigate]);

  useEffect(() => {
    const userService = new UsersService();
    userService
      .getOneUserActivityById(id) // 12 et 18
      .then(setActivity)
      .catch(() => setActivity(ActivityModel.null));
  }, [id, navigate]);

  useEffect(() => {
    const userService = new UsersService();
    userService
      .getOneUserAverageSessionById(id) // 12 et 18
      .then(setAverageSession)
      .catch(() => setAverageSession(AverageSessionModel.null));
  }, [id, navigate]);

  useEffect(() => {
    const userService = new UsersService();
    userService
      .getOneUserPerformanceById(id) // 12 et 18
      .then(setPerformance)
      .catch(() => setPerformance(PerformancesModel.null));
  }, [id, navigate]);

  return (
    <section>
      <TitleComponent user={user} />
      <NotificationComponent
        messageNotification={'Félicitation ! Vous avez explosé vos objectifs hier 👏'}
      />
      <div className={'graph-container'}>
        <div>
          {activity && <h2>Activité de l'utilisateur n°{activity.userId}</h2>}
          {averageSession && <h2>Session moyenne de l'utilisateur n°{averageSession.userId}</h2>}
          {performance && <h2>Performance de l'utilisateur n°{performance.userId}</h2>}
        </div>
        <aside>
          {user && (
            <CardComponent
              src={'/sport-see/assets/svg/calories-icon.svg'}
              title={'Calories'}
              data={user.keyData.calorieCount}
            />
          )}
          {user && (
            <CardComponent
              src={'/sport-see/assets/svg/protein-icon.svg'}
              title={'Protéines'}
              data={user.keyData.proteinCount}
            />
          )}
          {user && (
            <CardComponent
              src={'/sport-see/assets/svg/carbs-icon.svg'}
              title={'Glucides'}
              data={user.keyData.carbohydrateCount}
            />
          )}
          {user && (
            <CardComponent
              src={'/sport-see/assets/svg/fat-icon.svg'}
              title={'Lupides'}
              data={user.keyData.lipidCount}
            />
          )}
        </aside>
      </div>
    </section>
  );
};

export default DashboardPage;
