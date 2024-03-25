import './index.scss';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../components/bloc/CardComponent';
import NotificationComponent from '../../components/bloc/NotificationComponent';
import TitleComponent from '../../components/bloc/TitleComponent';
import { UserActivityModel } from '../../core/models/user-activity-model';
import { UserModel } from '../../core/models/user-model';
import UsersService from '../../core/services/users-service';

const DashboardPage = () => {
  const [user, setUser] = useState(UserModel.null);
  const [activity, setActivity] = useState(UserActivityModel.null);
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
      .catch(() => setActivity(UserActivityModel.null));
  }, [id, navigate]);

  return (
    <section>
      <TitleComponent user={user} />
      <NotificationComponent
        messageNotification={'Félicitation ! Vous avez explosé vos objectifs hier 👏'}
      />
      <div>
        <section>
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
