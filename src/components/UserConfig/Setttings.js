import Modal from '../UI/Modal';
import classes from './Settings.module.scss';
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
    <Modal onClose={props.onClose} className={classes.settings}>
      <h2>Settings</h2>
      <form className={classes.form} onSubmit={applySettingsHandler}>
        <h3>Time (minutes)</h3>
        <div className={classes.form__group}>
          <label htmlFor="pomodoro">pomodoro</label>
          <input
            ref={pomodoroInputRef}
            type="number"
            min={1}
            id="pomodoro"
            placeholder="25"
          />
        </div>
        <div className={classes.form__group}>
          <label htmlFor="shortBreak">short break</label>
          <input
            ref={shortBreakInputRef}
            type="number"
            min={1}
            id="shortBreak"
            placeholder="5"
          />
        </div>
        <div className={classes.form__group}>
          <label htmlFor="longBreak">long break</label>
          <input
            ref={longBreakInputRef}
            type="number"
            min={1}
            id="longBreak"
            placeholder="10"
          />
        </div>
        <button type="submit" className="btn">
          Apply
        </button>
      </form>
    </Modal>
  );
};

export default Settings;
