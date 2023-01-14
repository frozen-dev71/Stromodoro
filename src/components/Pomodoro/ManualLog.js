import Card from '../UI/Card';
import ConfirmAction from '../UserFeedback/ConfirmAction';

import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activityActions } from '../../store/activity';

const ManualLog = () => {
  const dispatch = useDispatch();
  const startingHourRef = useRef();
  const activeMinutesRef = useRef();
  const [error, setError] = useState(null);
  const [confirmationData, setConfirmationData] = useState(null);
  const timerIsActive = useSelector(state => state.timer.isActive);

  const submitTimeHandler = event => {
    event.preventDefault();

    setError(null);

    // By not allowing the user to submit when timer is active we avoid overlapping data
    if (timerIsActive) {
      setError(`Pause your pomodoro before adding time manually!`);
      return;
    }

    const enteredHour = +startingHourRef.current.value;
    const enteredMinutes = +activeMinutesRef.current.value;

    const now = new Date();

    // VALIDATING THE HOUR
    const currentHour = now.getHours();
    if (enteredHour > currentHour) {
      setError(`Future hours are not valid!`);
      return;
    }

    //COMPUTING THE FINALIZATION TIME
    const minutesInHours = Math.trunc(enteredMinutes / 60);
    const remainingMinutes = enteredMinutes % 60;

    const finalizationTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      enteredHour + minutesInHours,
      remainingMinutes
    );

    // VALIDATING THE FINALIZATION TIME
    if (finalizationTime.getTime() > now.getTime()) {
      setError(`Your finalization time is exceeding current time!`);
      return;
    }

    const dataToStore = {
      startingHour: enteredHour,
      hoursOfActivity: minutesInHours,
      remainingMinutes,
      safeToSave: false,
    };
    try {
      dispatch(activityActions.addActiveTime(dataToStore));
    } catch (err) {
      setConfirmationData({
        warning: err.message,
        savedData: { ...dataToStore, safeToSave: true },
      });
      return;
    }

    startingHourRef.current.value = '';
    activeMinutesRef.current.value = '';
  };

  const confirmHandler = () => {
    const { savedData } = confirmationData;
    dispatch(activityActions.addActiveTime(savedData));
    setConfirmationData(null);
    startingHourRef.current.value = '';
    activeMinutesRef.current.value = '';
  };

  const abortConfirmHandler = () => {
    setConfirmationData(null);
  };

  return (

  );
};

export default ManualLog;
