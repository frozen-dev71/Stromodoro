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
import TasksPage from './pages/TasksPage';
import { timerActions } from './store/timer';
import { tasksActions } from './store/tasks';
import { activityActions } from './store/activity';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useEffect, useState } from 'react';
import { dateIsYesterday, dateIsToday, getData } from './helpers/helpers';
import { calendarActions } from './store/calendar';


function App() {
  return (
    <Layout>
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/pomodoro" element={<PomodoroPage />} />
      <Route path="/tasks" element={<TasksPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  </Layout>
  );
}

export default App;
