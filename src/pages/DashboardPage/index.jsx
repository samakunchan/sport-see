import './index.scss';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserModel } from '../../core/models/user-model';
import UsersService from '../../core/services/users-service';

const DashboardPage = () => {
  const [user, setUser] = useState(UserModel.null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const userService = new UsersService();
    userService
      .getOneUserById(id) // 12 et 18
      .then(setUser)
      .catch(() => setUser(UserModel.null));
  }, [id, navigate]);

  return (
    user && (
      <section>
        <h1>{user.userInfos.firstName}</h1>
      </section>
    )
  );
};

export default DashboardPage;
