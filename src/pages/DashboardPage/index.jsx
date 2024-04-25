import './index.scss';
// import {
//   fakeActivity,
//   fakeAverageSession,
//   fakePerformance,
//   fakeUser,
// } from '../../core/utils/fake-datas';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ActivityModel } from '../../core/models/activity/activity-model';
import { AverageSessionModel } from '../../core/models/average-session/average-session-model';
import BarChartComponent from '../../components/bloc/BarChartComponent';
import CardComponent from '../../components/bloc/CardComponent';
import { ErrorModel } from '../../core/models/error-model';
import { HttpErrorStatusCode } from '../../core/utils/error-util';
import LineChartComponent from '../../components/bloc/LineChartComponent';
import NotificationComponent from '../../components/bloc/NotificationComponent';
import { PerformanceModel } from '../../core/models/performances/performances-model';
import RadarChartComponent from '../../components/bloc/RadarChartComponent';
import RadialBarChartComponent from '../../components/bloc/RadialBarChartComponent';
import TitleComponent from '../../components/bloc/TitleComponent';
import { UserModel } from '../../core/models/user/user-model';
import UsersService from '../../core/services/users-service';

const DashboardPage = () => {
  const [user, setUser] = useState(UserModel.null | ErrorModel.null);
  const [activity, setActivity] = useState(ActivityModel.null);
  const [averageSession, setAverageSession] = useState(AverageSessionModel.null);
  const [performance, setPerformance] = useState(PerformanceModel.null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const userService = new UsersService();
    userService
      .getOneUserById(id) // 12 et 18
      .then(userDatas => {
        setUser(userDatas);
        return userDatas;
      })
      .then(userDatas => {
        if (userDatas !== undefined && userDatas instanceof UserModel) {
          const userId = userDatas.id.toString();
          userService
            .getOneUserActivityById(userId) // 12 et 18
            .then(setActivity)
            .catch(() => setActivity(ActivityModel.null));

          userService
            .getOneUserAverageSessionById(userId) // 12 et 18
            .then(setAverageSession)
            .catch(() => setAverageSession(AverageSessionModel.null));

          userService
            .getOneUserPerformanceById(userId) // 12 et 18
            .then(setPerformance)
            .catch(() => setPerformance(PerformanceModel.null));
        }
      })
      .catch(error => {
        if (error instanceof ErrorModel && error.statusCode === HttpErrorStatusCode.notFound) {
          navigate('/error');
        }

        return setUser(UserModel.null);
      });
  }, [id, navigate]);

  return (
    <section>
      {user && (
        <>
          <TitleComponent user={user} />
          <NotificationComponent
            messageNotification={'Félicitation ! Vous avez explosé vos objectifs hier 👏'}
          />
          <div className={'graph-container'}>
            <div className={'graphs'}>
              <div className={'main-graph'}>
                {activity && (
                  <BarChartComponent
                    poids={activity.sessions.map(session => Number(session.kilogram))}
                    calories={activity.sessions.map(session => Number(session.calories))}
                  />
                )}
              </div>
              <div className={'secondary-graphs'}>
                {averageSession && <LineChartComponent sessions={averageSession.sessions} />}
                {performance && <RadarChartComponent performance={performance} />}
                {user && <RadialBarChartComponent todayScore={user.todayScore} />}
              </div>
            </div>
            <aside>
              <CardComponent
                src={'/sport-see/assets/svg/calories-icon.svg'}
                title={'Calories'}
                data={user.keyData.calorieCount}
              />
              <CardComponent
                src={'/sport-see/assets/svg/protein-icon.svg'}
                title={'Protéines'}
                data={user.keyData.proteinCount}
              />
              <CardComponent
                src={'/sport-see/assets/svg/carbs-icon.svg'}
                title={'Glucides'}
                data={user.keyData.carbohydrateCount}
              />
              <CardComponent
                src={'/sport-see/assets/svg/fat-icon.svg'}
                title={'Lipides'}
                data={user.keyData.lipidCount}
              />
            </aside>
          </div>
        </>
      )}
    </section>
  );
};

export default DashboardPage;
