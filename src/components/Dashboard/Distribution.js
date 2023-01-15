import classes from './Distribution.module.scss';
import Card from '../UI/Card';
import TasksPieChart from '../Charts/TasksPieChart';

const Distribution = () => {
  return (
    <Card className={classes.distribution}>
      <h3>Task Distribution</h3>
      <div className={classes.distribution__chart}>
        <TasksPieChart />
      </div>
    </Card>
  );
};

export default Distribution;
