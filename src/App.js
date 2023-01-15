import Layout from './components/Layout/Layout';
import {
  Routes,
  Route,
  Navigate,
  matchPath,
  useLocation,
} from 'react-router-dom';
import PomodoroPage from './pages/PomodoroPage';
import DashboardPage from './pages/DashboardPage';
import StatisticsPage from './pages/StatisticsPage';
import TasksPage from './pages/TasksPage';
import { timerActions } from './store/timer';
import { tasksActions } from './store/tasks';
import { activityActions } from './store/activity';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useEffect, useState } from 'react';
import useUnload from './hooks/useUnload';
import usePageVisibilty from './hooks/usePageVisibility';
import { dateIsYesterday, dateIsToday, getData } from './helpers/helpers';
import { calendarActions } from './store/calendar';
import audioFile from './assets/completed.mp3';


let secondsOutsidePomodoro = 0;
let audioPlayedOutside = false;
const audio = new Audio(audioFile);

function App() {
  const dispatch = useDispatch();
  const timerIsActive = useSelector(state => state.timer.isActive);
  const location = useLocation();
  const pomodoroWasCompleted = useSelector(state => state.timer.wasCompleted);
  const pomodoroMinutes = useSelector(state => state.timer.config.pomodoro);
  const countdown = useSelector(state => state.timer.countdown);
  const [pageVisibility, setPageVisibility] = useState(
    document.visibilityState
  );

  const match = matchPath(
    {
      path: '/pomodoro',
      exact: true,
      strict: false,
    },
    location.pathname
  );

  useEffect(() => {
    if (localStorage.getItem('timer')) {
      dispatch(timerActions.getTimerData());
    }
    if (localStorage.getItem('tasks')) {
      dispatch(tasksActions.getTasksData());
    }
    if (localStorage.getItem('calendar')) {
      dispatch(calendarActions.getCalendarData());
    }
    if (localStorage.getItem('activity')) {
      const storedActivity = getData('activity');
      if (dateIsToday(storedActivity.date)) {
        dispatch(activityActions.getActivityData());
      } else {
        dispatch(calendarActions.insertActivityData(storedActivity));
        dispatch(timerActions.changeTimer('pomodoro'));
        if (!dateIsYesterday(storedActivity.date))
          // insert null data for yesterday so the statistics will update with the correct data
          dispatch(calendarActions.insertYesterdayData());
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (pomodoroWasCompleted) {
      dispatch(activityActions.addCompletedPomodoro());
      dispatch(
        activityActions.saveMinutesWhenPomodoroPaused({
          totalSeconds: pomodoroMinutes * 60,
          countdown: { minutes: 0, seconds: 0 },
          reinitMinutesPassed: true,
        })
      );
    }
  }, [pomodoroWasCompleted, dispatch, pomodoroMinutes]);

  useEffect(() => {
    const remainingSeconds = countdown.minutes * 60 + countdown.seconds;
    if (remainingSeconds > 0) audioPlayedOutside = false;
    if (remainingSeconds === 0 && !audioPlayedOutside) audio.play();
  }, [countdown]);


  return (
    <Layout>
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/pomodoro" element={<PomodoroPage />} />
      <Route path="/tasks" element={<TasksPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/statistics" element={<StatisticsPage />} />
    </Routes>
  </Layout>
  );
}

export default App;
