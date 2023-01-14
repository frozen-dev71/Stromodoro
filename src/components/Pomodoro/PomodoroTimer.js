
import '../../styles/abstracts.scss';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { timerActions } from '../../store/timer';
import { activityActions } from '../../store/activity';

const PomodoroTimer = () => {
  const dispatch = useDispatch();
  const isActive = useSelector(state => state.timer.isActive);
  const countdown = useSelector(state => state.timer.countdown);
  const totalSeconds = useSelector(state => state.timer.totalSeconds);
  const timerType = useSelector(state => state.timer.type);
  const [wasClicked, setWasClicked] = useState(false);
  const [percentage, setPercentage] = useState(0);

  const clickTimerHandler = () => {
    // Animation
    setWasClicked(true);
    setTimeout(() => {
      setWasClicked(false);
    }, 300);
    if (timerType === 'pomodoro' && isActive) {
      dispatch(
        activityActions.saveMinutesWhenPomodoroPaused({
          totalSeconds,
          countdown,
          reinitMinutesPassed: false,
        })
      );
    }
    dispatch(timerActions.toggleIsActive());
  };

  useEffect(() => {
    // Countdown Interval
    if (isActive) {
      const interval = setInterval(() => {
        dispatch(timerActions.countdown(interval));
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [isActive, dispatch]);

  useEffect(() => {
    const secondsCompleted =
      totalSeconds - countdown.minutes * 60 - countdown.seconds;
    const newPercentage = (secondsCompleted / totalSeconds) * 100;
    setPercentage(newPercentage);
  }, [countdown, totalSeconds]);

  return (
   
  );
};

export default PomodoroTimer;
