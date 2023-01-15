import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import Card from '../UI/Card';
import classes from './Report.module.scss';
import { addHours } from '../../helpers/helpers';

const ReportRegistration = ({ name, value }) => {
  return (
    <Fragment>
      <div className={classes['report__table-row-label']}>{name}</div>
      <div className={classes['report__table-row-value']}>{value}</div>
    </Fragment>
  );
};

const Report = () => {
  const calendar = useSelector(state => state.calendar.calendar);
  const currentMonth = new Date().getMonth();

  // COMPUTE DISPLAYED MONTH AND YEAR
  let displayedYear;
  if (currentMonth === 0) {
    displayedYear = new Date().getFullYear() - 1;
  } else displayedYear = new Date().getFullYear();

  const displayedMonth = new Date(
    displayedYear,
    currentMonth - 1,
    1
  ).toLocaleString('en-US', { month: 'long' });

  //GET LAST MONTH's DATA AND FILTER ACTIVE DAYS
  const passedMonthData = calendar.at(
    currentMonth !== 0 ? currentMonth - 1 : 11
  );
  const activeDays = passedMonthData.filter(day => day);

  //PREPARE DATA FOR THE JSX
  const totalTasks = activeDays.reduce(
    (acc, day) => acc + day.numberOfCompletedTasks,
    0
  );
  const totalPomodoros = activeDays.reduce(
    (acc, day) => acc + day.numberOfCompletedPomodoros,
    0
  );
  const totalActiveTime = activeDays.reduce(
    (acc, day) => acc + addHours(day.hours),
    0
  );

  return (
    <Card className={classes.report}>
      <h3>Monthly Report</h3>
      <h4>{`${displayedMonth} ${displayedYear}`}</h4>
      <div className={classes.report__table}>
        <ReportRegistration
          name={'Total active days'}
          value={activeDays.length}
        />
        <ReportRegistration
          name={'Total productive time'}
          value={`${Math.trunc(totalActiveTime)}h`}
        />
        <ReportRegistration name={'Total tasks'} value={totalTasks} />
        <ReportRegistration name={'Total pomodoros'} value={totalPomodoros} />
      </div>
    </Card>
  );
};

export default Report;
