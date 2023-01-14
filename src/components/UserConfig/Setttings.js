import Modal from '../UI/Modal';

import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { timerActions } from '../../store/timer';

const Settings = props => {
  const pomodoroInputRef = useRef();
  const shortBreakInputRef = useRef();
  const longBreakInputRef = useRef();
  const dispatch = useDispatch();
  const activeTimer = useSelector(state => state.timer.type);

  const applySettingsHandler = event => {
    event.preventDefault();

    const enteredPomodoro = pomodoroInputRef.current.value || 25;
    const enteredShortBreak = shortBreakInputRef.current.value || 5;
    const enteredLongBreak = longBreakInputRef.current.value || 10;

    const newConfig = {
      pomodoro: +enteredPomodoro,
      short: +enteredShortBreak,
      long: +enteredLongBreak,
    };
    dispatch(timerActions.updateConfig(newConfig));
    dispatch(timerActions.changeTimer(activeTimer));
    props.onClose();
  };

  return (

  );
};

export default Settings;
