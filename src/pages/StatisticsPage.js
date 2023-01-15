import Progress from '../components/Statistics/Progress';
import Streaks from '../components/Statistics/Streaks';
import Report from '../components/Statistics/Report';
import TasksStats from '../components/Statistics/TasksStats';

const StatisticsPage = () => {
  return (
    <div className="main-statistics">
      <Progress />
      <Report />
      <Streaks />
      <TasksStats />
    </div>
  );
};

export default StatisticsPage;
