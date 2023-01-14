import classes from './Pomodoro.module.scss';
import PomodoroOptions from './PomodoroOptions';
import PomodoroTimer from './PomodoroTimer';
import PomodoroReset from './PomodoroReset';

const Pomodoro = () => {
  return (
    <div className={classes.pomodoro}>
      <PomodoroOptions />
      <PomodoroTimer />
      <PomodoroReset />
    </div>
  );
};

export default Pomodoro;
