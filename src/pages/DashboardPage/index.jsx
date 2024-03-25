import './index.scss';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ActivityModel } from '../../core/models/activity/activity-model';
import { AverageSessionModel } from '../../core/models/average-session/average-session-model';
import CardComponent from '../../components/bloc/CardComponent';
import NotificationComponent from '../../components/bloc/NotificationComponent';
import TitleComponent from '../../components/bloc/TitleComponent';
import { UserModel } from '../../core/models/user/user-model';
import UsersService from '../../core/services/users-service';

const DashboardPage = () => {
  const [user, setUser] = useState(UserModel.null);
  const [activity, setActivity] = useState(ActivityModel.null);
  const [averageSession, setAverageSession] = useState(AverageSessionModel.null);
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

  return (
    <section>
      <TitleComponent user={user} />
      <NotificationComponent
        messageNotification={'Félicitation ! Vous avez explosé vos objectifs hier 👏'}
      />
      <div>
        <section>
          {activity && <h2>Activité de l'utilisateur n°{activity.userId}</h2>}
          {averageSession && <h2>Session moyenne de l'utilisateur n°{averageSession.userId}</h2>}
          <CardComponent />
          <div>
            <CardComponent />
            <CardComponent />
            <CardComponent />
          </div>
        </section>
        <aside>
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
        </aside>
      </div>
    </section>
  );
};

export default DashboardPage;
