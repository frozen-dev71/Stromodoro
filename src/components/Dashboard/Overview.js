import classes from './Overview.module.scss';
import Card from '../UI/Card';
import { useSelector } from 'react-redux';

const OverviewCard = ({ metric, label }) => {
  return (
    <li>
      <span className={classes.overview__metric}>{metric}</span>
      <span className={classes.overview__description}>{label}</span>
    </li>
  );
};

const Overview = () => {
  const tasks = useSelector(state => state.tasks.tasks);
  const numTasksDoneToday = useSelector(
    state => state.activity.numberOfCompletedTasks
  );
  const hours = useSelector(state => state.activity.hours);
  const numPomodoros = useSelector(
    state => state.activity.numberOfCompletedPomodoros
  );
  const numOfActiveTasks = tasks.filter(task => !task.completed).length;

  const activityMinutes = hours.reduce(
    (acc, hour) => acc + hour.activeMinutes,
    0
  );
  const hoursOfActivity = Math.trunc(activityMinutes / 60);
  const activeTime = hoursOfActivity
    ? `${hoursOfActivity}h ${activityMinutes % 60}m`
    : `${activityMinutes}m`;

  return (
    <Card className={classes.overview}>
      <h3>Today's Overview</h3>
      <ul>
        <OverviewCard
          metric={numOfActiveTasks}
          label={`active ${numOfActiveTasks === 1 ? 'task' : 'tasks'}`}
        />
        <OverviewCard
          metric={numTasksDoneToday}
          label={`${numTasksDoneToday === 1 ? 'task' : 'tasks'} done`}
        />
        <OverviewCard
          metric={numPomodoros}
          label={`${numPomodoros === 1 ? 'pomodoro' : 'pomodoros'}`}
        />
        <OverviewCard metric={activeTime} label="of activity" />
      </ul>
    </Card>
  );
};

export default Overview;
