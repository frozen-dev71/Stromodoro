import { Fragment } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import ConfirmAction from '../UserFeedback/ConfirmAction';
import { timerActions } from '../../store/timer';
import { activityActions } from '../../store/activity';

const PomodoroReset = () => {
  const {
    type: activeTimer,
    countdown,
    totalSeconds,
  } = useSelector(state => state.timer);

  const dispatch = useDispatch();
  const [confirmModalIsActive, setConfirmModalIsActive] = useState(false);
  const confirmResetHandler = () => {
    if (totalSeconds === countdown.seconds + countdown.minutes * 60) {
      dispatch(timerActions.changeTimer(activeTimer));
      return;
    }
    if (countdown.seconds + countdown.minutes * 60 === 0) {
      dispatch(timerActions.changeTimer(activeTimer));
      return;
    }
    setConfirmModalIsActive(true);
  };

  const resetPomodoroHandler = () => {
    if (confirmModalIsActive) setConfirmModalIsActive(false);
    if (activeTimer === 'pomodoro') {
      dispatch(
        activityActions.saveMinutesWhenPomodoroPaused({
          totalSeconds,
          countdown,
          reinitMinutesPassed: true,
        })
      );
    }
    dispatch(timerActions.changeTimer(activeTimer));
  };
  const cancelConfirmationHandler = () => {
    setConfirmModalIsActive(false);
  };
  return (

  );
};

export default PomodoroReset;
