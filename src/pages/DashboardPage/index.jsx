import './index.scss';
import { useEffect, useState } from 'react';
import { ActivityModel } from '../../core/models/activity/activity-model';
import { AverageSessionModel } from '../../core/models/average-session/average-session-model';
import CardComponent from '../../components/bloc/CardComponent';
import HistogramComponent from '../../components/bloc/HistogramComponent';
import LineChartComponent from '../../components/bloc/LineChartComponent';
import NotificationComponent from '../../components/bloc/NotificationComponent';
import { PerformanceModel } from '../../core/models/performances/performances-model';
import RadarChartComponent from '../../components/bloc/RadarChartComponent';
import RadialBarChartComponent from '../../components/bloc/RadialBarChartComponent';
import TitleComponent from '../../components/bloc/TitleComponent';
import { UserModel } from '../../core/models/user/user-model';
import UsersService from '../../core/services/users-service';
import { useParams } from 'react-router-dom';

const DashboardPage = () => {
  const [user, setUser] = useState(UserModel.null);
  const [activity, setActivity] = useState(ActivityModel.null);
  const [averageSession, setAverageSession] = useState(AverageSessionModel.null);
  const [performance, setPerformance] = useState(PerformanceModel.null);
  const { id } = useParams();

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
      .catch(() => setUser(UserModel.null));
  }, [id]);

  return (
    <section>
      <TitleComponent user={user} />
      <NotificationComponent
        messageNotification={'Félicitation ! Vous avez explosé vos objectifs hier 👏'}
      />
      <div className={'graph-container'}>
        <div className={'graphs'}>
          <div className={'main-graph'}>
            {activity && (
              <HistogramComponent
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
        {user && (
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
              title={'Lupides'}
              data={user.keyData.lipidCount}
            />
          </aside>
        )}
      </div>
    </section>
  );
};

export default DashboardPage;
