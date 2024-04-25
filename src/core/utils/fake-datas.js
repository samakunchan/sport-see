import { ActivityModel } from '../models/activity/activity-model';
import { AverageSessionModel } from '../models/average-session/average-session-model';
import { PerformanceModel } from '../models/performances/performances-model';
import { UserModel } from '../models/user/user-model';

const fakeUserJSON = {
  data: {
    id: -1,
    userInfos: {
      firstName: 'John',
      lastName: 'Doe',
      age: 22,
    },
    todayScore: 0.37,
    keyData: {
      calorieCount: 2000,
      proteinCount: 150,
      carbohydrateCount: 290,
      // "lipidCount": 50
    },
  },
};

const fakePerformanceJSON = {
  data: {
    userId: -1,
    kind: {
      1: 'cardio',
      2: 'energy',
      3: 'endurance',
      4: 'strength',
      5: 'speed',
      6: 'intensity',
    },
    data: [
      {
        value: 100,
        kind: 1,
      },
      {
        value: 100,
        kind: 2,
      },
      {
        value: 100,
        kind: 3,
      },
      {
        value: 100,
        kind: 4,
      },
      {
        value: 100,
        kind: 5,
      },
      {
        value: 100,
        kind: 6,
      },
    ],
  },
};

const fakeAverageSessionJSON = {
  data: {
    userId: -1,
    sessions: [
      {
        day: 1,
        sessionLength: 10,
      },
      {
        day: 2,
        sessionLength: 50,
      },
      {
        day: 3,
        sessionLength: 10,
      },
      {
        day: 4,
        sessionLength: 50,
      },
      {
        day: 5,
        sessionLength: 0,
      },
      {
        day: 6,
        sessionLength: 90,
      },
      {
        day: 7,
        sessionLength: 60,
      },
    ],
  },
};

const fakeActivityJSON = {
  data: {
    userId: -1,
    sessions: [
      {
        day: '2020-07-01',
        kilogram: 80,
        calories: 300,
      },
      {
        day: '2020-07-02',
        kilogram: 85,
        calories: 220,
      },
      {
        day: '2020-07-03',
        kilogram: 85,
        calories: 280,
      },
      {
        day: '2020-07-04',
        kilogram: 83,
        calories: 150,
      },
      {
        day: '2020-07-05',
        kilogram: 82,
        calories: 400,
      },
      {
        day: '2020-07-06',
        kilogram: 81,
        calories: 600,
      },
      {
        day: '2020-07-07',
        kilogram: 80,
        calories: 390,
      },
    ],
  },
};

export const fakeUser = new UserModel(fakeUserJSON[`data`]);
export const fakePerformance = new PerformanceModel(fakePerformanceJSON[`data`]);
export const fakeAverageSession = new AverageSessionModel(fakeAverageSessionJSON[`data`]);
export const fakeActivity = new ActivityModel(fakeActivityJSON[`data`]);
