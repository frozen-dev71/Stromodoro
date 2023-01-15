import Card from '../UI/Card';
import classes from './Progress.module.scss';
import LineChart from '../Charts/LineChart';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { findWeeklyData } from '../../helpers/helpers';

/////////////////////////////////////////////////////////////////////////////
// COMPONENT
const Progress = () => {
  const calendar = useSelector(state => state.calendar.calendar);
  const [progressData, setProgressData] = useState([]); //formatted data

  useEffect(() => {
    const data = findWeeklyData(calendar);
    // console.log(data);
    setProgressData(data);
  }, [calendar]);

  return (
    <Card className={classes.progress}>
      <h3>Weekly Progress</h3>
      <div className={classes.progress__chart}>
        <LineChart data={progressData} maxValue={18} unit="h" />
      </div>
    </Card>
  );
};

export default Progress;
