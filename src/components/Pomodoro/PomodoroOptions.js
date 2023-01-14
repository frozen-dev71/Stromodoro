import classes from './PomodoroOptions.module.scss';
import ConfirmAction from '../UserFeedback/ConfirmAction';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { timerActions } from '../../store/timer';
import { activityActions } from '../../store/activity';
import React, { useState } from 'react';

let timer;
const PomodoroOptions = () => {
  const {
    type: activeTimer,
    countdown,
    totalSeconds,
  } = useSelector(state => state.timer);

  const dispatch = useDispatch();
  const [confirmModalIsActive, setConfirmModalIsActive] = useState(false);

  const changeTimerHandler = event => {
    const clickedListItem = event.target.closest('li');
    if (!clickedListItem) return;

    timer = clickedListItem.dataset.timer;
    if (totalSeconds === countdown.seconds + countdown.minutes * 60) {
      dispatch(timerActions.changeTimer(timer));
      return;
    }
    if (countdown.seconds + countdown.minutes * 60 === 0) {
      dispatch(timerActions.changeTimer(timer));
      return;
    }
    setConfirmModalIsActive(true);
  };
  const confirmActionHandler = () => {
    setConfirmModalIsActive(false);
    if (activeTimer === 'pomodoro') {
      dispatch(
        activityActions.saveMinutesWhenPomodoroPaused({
          totalSeconds,
          countdown,
          reinitMinutesPassed: true,
        })
      );
    }
    dispatch(timerActions.changeTimer(timer));
  };
  const closeConfirmationHandler = () => {
    setConfirmModalIsActive(false);
  };

  const defaultClass = classes.option;
  const activeClasses = `${classes.option} ${classes['option--active']}`;
  const pomodoroClasses =
    activeTimer === 'pomodoro' ? activeClasses : defaultClass;
  const shortBreakClasses =
    activeTimer === 'shortBR' ? activeClasses : defaultClass;
  const longBreakClasses =
    activeTimer === 'longBR' ? activeClasses : defaultClass;

  return (
    <React.Fragment>
      {confirmModalIsActive && (
        <ConfirmAction
          onClose={closeConfirmationHandler}
          onConfirm={confirmActionHandler}
        >
          {activeTimer === 'pomodoro'
            ? "Current timer progress will be lost and your pomodoro won't be marked as completed!"
            : 'Current timer progress will be lost!'}
        </ConfirmAction>
      )}
      <ul className={classes.options} onClick={changeTimerHandler}>
        <li className={pomodoroClasses} data-timer="pomodoro">
          pomodoro
        </li>
        <li className={shortBreakClasses} data-timer="shortBR">
          short break
        </li>
        <li className={longBreakClasses} data-timer="longBR">
          long break
        </li>
      </ul>
    </React.Fragment>
  );
};

export default PomodoroOptions;
